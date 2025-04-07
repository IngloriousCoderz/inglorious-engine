import { enableGame } from "@inglorious/game/decorators/game"
import { filter, map } from "@inglorious/utils/data-structures/object.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

// Default configuration for the store.
const DEFAULT_CONFIG = { types: { game: [enableGame()] } }

// Default state of the store.
const DEFAULT_STATE = {
  events: [],
  // eslint-disable-next-line no-magic-numbers
  instances: { game: { type: "game", bounds: [0, 0, 800, 600] } }, // Default game instance with bounds.
}

/**
 * Creates a store to manage state and events.
 * @param {Object} options - Configuration options for the store.
 * @param {Object} options.instances - Initial instances to include in the store.
 * @param {Object} options.originalConfig - Additional configuration for the store.
 * @returns {Object} The store with methods to interact with state and events.
 */
export function createStore({ instances = {}, ...originalConfig }) {
  const listeners = new Set()
  let incomingEvents = []

  const config = extend(DEFAULT_CONFIG, originalConfig)
  const types = augment(config.types)

  let state = extend(DEFAULT_STATE, { instances })
  state = turnStateIntoFsm(state)

  return {
    subscribe,
    update,
    notify,
    dispatch: notify, // needed for react-redux
    getTypes,
    getState,
  }

  /**
   * Subscribes a listener to state updates.
   * @param {Function} listener - The listener function to call on updates.
   * @returns {Function} A function to unsubscribe the listener.
   */
  function subscribe(listener) {
    listeners.add(listener)

    return function unsubscribe() {
      listeners.delete(listener)
    }
  }

  /**
   * Updates the state based on elapsed time and processes events.
   * @param {number} dt - The delta time since the last update.
   */
  function update(dt) {
    state = { ...state }

    state.events.push(...incomingEvents, { id: "game:update" })
    incomingEvents = []

    while (state.events.length) {
      const event = state.events.shift()

      if (event.id === "instance:add") {
        add(event.payload.id, event.payload)
      }

      state.instances = map(state.instances, (_, instance, instances) => {
        const type = types[instance.type]
        const state = type.states[instance.state]
        const handle = state[event.id]
        return (
          handle?.(instance, event, {
            dt,
            type: config.types[instance.type],
            instances,
            notify,
          }) ?? instance
        )
      })

      if (event.id === "instance:remove") {
        remove(event.payload)
      }
    }

    listeners.forEach((onUpdate) => onUpdate())
  }

  /**
   * Adds a new instance to the state.
   * @param {string} id - The ID of the instance to add.
   * @param {Object} instance - The instance object to add.
   */
  function add(id, instance) {
    state = { ...state }
    state.instances[id] = turnInstanceIntoFsm(id, instance)
  }

  /**
   * Removes an instance from the state.
   * @param {string} id - The ID of the instance to remove.
   */
  function remove(id) {
    state = { ...state }
    delete state.instances[id]
  }

  /**
   * Notifies the store of a new event.
   * @param {Object} event - The event object to notify.
   */
  function notify(event) {
    incomingEvents.push(event)
  }

  /**
   * Retrieves the types configuration.
   * @returns {Object} The types configuration.
   */
  function getTypes() {
    return types
  }

  /**
   * Retrieves the current state.
   * @returns {Object} The current state.
   */
  function getState() {
    return state
  }
}

/**
 * Augments the types configuration with additional functionality.
 * @param {Object} types - The types configuration.
 * @returns {Object} The augmented types configuration.
 */
function augment(types) {
  return pipe(applyDecorators, turnIntoFsm, enableMutability)(types)
}

/**
 * Applies decorators to the types configuration.
 * @param {Object} types - The types configuration.
 * @returns {Object} The decorated types configuration.
 */
function applyDecorators(types) {
  return map(types, (_, type) => {
    if (!Array.isArray(type)) {
      return type
    }

    const decorators = type.map((fn) =>
      typeof fn !== "function" ? (type) => extend(type, fn) : fn,
    )
    return pipe(...decorators)({})
  })
}

/**
 * Converts the types configuration into a finite state machine (FSM).
 * @param {Object} types - The types configuration.
 * @returns {Object} The FSM-enabled types configuration.
 */
function turnIntoFsm(types) {
  return map(types, (_, type) => {
    const { draw, ...rest } = type
    const topLevelEventHandlers = filter(
      rest,
      (_, value) => typeof value === "function",
    )
    const typeWithoutTopLevelEventHandlers = filter(
      rest,
      (_, value) => typeof value !== "function",
    )

    return extend(
      typeWithoutTopLevelEventHandlers,
      { draw },
      {
        states: { default: topLevelEventHandlers },
      },
    )
  })
}

/**
 * Enables mutability for event handlers in the types configuration.
 * @param {Object} types - The types configuration.
 * @returns {Object} The mutability-enabled types configuration.
 */
function enableMutability(types) {
  return map(types, (_, { states, ...rest }) => ({
    ...rest,
    states: map(states, (_, events) =>
      map(events, (_, event) => produce(event)),
    ),
  }))
}

/**
 * Converts the state into a finite state machine (FSM) structure.
 * @param {Object} state - The current state.
 * @returns {Object} The FSM-enabled state.
 */
function turnStateIntoFsm(state) {
  return {
    ...state,
    instances: map(state.instances, turnInstanceIntoFsm),
  }
}

function turnInstanceIntoFsm(id, instance) {
  return { ...instance, id, state: instance.state ?? "default" }
}
