import { game } from "@inglorious/game/behaviors/game.js"
import { map } from "@inglorious/utils/data-structures/object.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

const DEFAULT_TYPES = {
  game: [game()],
}

const DEFAULT_INSTANCES = {
  // eslint-disable-next-line no-magic-numbers
  game: { type: "game", bounds: [0, 0, 800, 600] }, // Default game instance with bounds.
}

const DEFAULT_LAYER = 0

/**
 * Creates a store to manage state and events.
 * @param {Object} options - Configuration options for the store.
 * @param {Object} options.instances - Initial instances to include in the store.
 * @param {Object} options.originalConfig - Additional configuration for the store.
 * @returns {Object} The store with methods to interact with state and events.
 */
export function createStore({
  types: originalTypes,
  instances: originalInstances,
}) {
  const listeners = new Set()
  let incomingEvents = []

  let types
  recomputeTypes()

  let instances
  recomputeInstances()

  let state = { events: [], instances }

  return {
    subscribe,
    update,
    notify,
    dispatch, // needed for react-redux
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

    state.events.push(...incomingEvents, { type: "update", payload: dt })
    incomingEvents = []

    while (state.events.length) {
      const event = state.events.shift()

      if (event.type === "morph") {
        const { id, type } = event.payload
        originalTypes[id] = type
        recomputeTypes()
      }

      if (event.type === "add") {
        add(event.payload.id, event.payload)
      }

      state.instances = map(state.instances, (_, instance, instances) => {
        const type = types[instance.type]
        const handle = type[event.type]
        return (
          handle?.(instance, event.payload, {
            type: originalTypes[instance.type],
            instances,
            notify,
          }) ?? instance
        )
      })

      if (event.type === "remove") {
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
    state.instances[id] = augmentInstance(id, instance)
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
   * @param {string} type - The event object type to notify.
   * @param {any} payload - The event object payload to notify.
   */
  function notify(type, payload) {
    dispatch({ type, payload })
  }

  function dispatch(event) {
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

  function recomputeTypes() {
    types = extend(DEFAULT_TYPES, originalTypes)
    types = augmentTypes(types)
  }

  function recomputeInstances() {
    instances = extend(DEFAULT_INSTANCES, originalInstances)
    instances = augmentInstances(instances)
  }
}

function augmentTypes(types) {
  return pipe(applyDecorators, enableMutability)(types)
}

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

function enableMutability(types) {
  return map(types, (_, { render, ...events }) => ({
    render,
    ...map(events, (_, event) => produce(event)),
  }))
}

function augmentInstances(instances) {
  return map(instances, augmentInstance)
}

function augmentInstance(id, instance) {
  return { ...instance, layer: instance.layer ?? DEFAULT_LAYER, id }
}
