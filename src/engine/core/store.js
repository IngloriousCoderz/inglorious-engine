import { map } from "@inglorious/utils/data-structures/object.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

const DEFAULT_LAYER = 0

/**
 * Creates a store to manage state and events.
 * @param {Object} config - Configuration options for the store.
 * @param {Object} [config.types] - The initial types configuration.
 * @param {Object} [config.entities] - The initial entities configuration.
 * @returns {Object} The store with methods to interact with state and events.
 */
export function createStore({
  types: originalTypes,
  entities: originalEntities,
  systems = [],
}) {
  const listeners = new Set()
  let incomingEvents = []

  let types = augmentTypes(originalTypes)
  let entities = augmentEntities(originalEntities)

  const initialState = { entities }
  let state = initialState

  return {
    subscribe,
    update,
    notify,
    dispatch, // needed for compatibility with Redux
    getTypes,
    getOriginalTypes,
    getState,
    setState,
    reset,
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
   * @param {number} dt - The delta time since the last update in milliseconds.
   * @param {Object} api - The engine's public API.
   */
  function update(dt, api) {
    const processedEvents = []

    state = produce(state, (state) => {
      incomingEvents.push({ type: "update", payload: dt })

      while (incomingEvents.length) {
        const event = incomingEvents.shift()
        processedEvents.push(event)

        if (event.type === "morph") {
          const { id, type } = event.payload
          originalTypes[id] = type
          types = augmentTypes(originalTypes)
        }

        if (event.type === "add") {
          const { id, ...entity } = event.payload
          state.entities[id] = augmentEntity(id, entity)
        }

        if (event.type === "remove") {
          const id = event.payload
          delete state.entities[id]
        }

        for (const id in state.entities) {
          const entity = state.entities[id]
          const type = types[entity.type]
          const handle = type[event.type]
          handle?.(entity, event.payload, api)
        }

        systems.forEach((system) => {
          const handle = system[event.type]
          handle?.(state, event.payload, api)
        })
      }
    })

    listeners.forEach((onUpdate) => onUpdate())

    return processedEvents
  }

  /**
   * Notifies the store of a new event.
   * @param {string} type - The event object type to notify.
   * @param {any} payload - The event object payload to notify.
   */
  function notify(type, payload) {
    dispatch({ type, payload })
  }

  /**
   * Dispatches an event to be processed in the next update cycle.
   * @param {Object} event - The event object.
   * @param {string} event.type - The type of the event.
   * @param {any} [event.payload] - The payload of the event.
   */
  function dispatch(event) {
    incomingEvents.push(event)
  }

  /**
   * Retrieves the augmented types configuration.
   * This includes composed behaviors and event handlers wrapped for immutability.
   * @returns {Object} The augmented types configuration.
   */
  function getTypes() {
    return types
  }

  /**
   * Retrieves the original, un-augmented types configuration.
   * @returns {Object} The original types configuration.
   */
  function getOriginalTypes() {
    return originalTypes
  }

  /**
   * Retrieves the current state.
   * @returns {Object} The current state.
   */
  function getState() {
    return state
  }

  function setState(newState) {
    state = newState
  }

  function reset() {
    state = initialState // Reset state to its originally computed value
  }
}

function augmentTypes(types) {
  return pipe(applyBehaviors)(types)
}

function applyBehaviors(types) {
  return map(types, (_, type) => {
    if (!Array.isArray(type)) {
      return type
    }

    const behaviors = type.map((fn) =>
      typeof fn !== "function" ? (type) => extend(type, fn) : fn,
    )
    return pipe(...behaviors)({})
  })
}

function augmentEntities(entities) {
  return map(entities, augmentEntity)
}

function augmentEntity(id, entity) {
  return { ...entity, layer: entity.layer ?? DEFAULT_LAYER, id }
}
