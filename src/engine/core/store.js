import { game } from "@inglorious/engine/behaviors/game.js"
import { map } from "@inglorious/utils/data-structures/object.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

import { readOnlyStateProxyHandler } from "./proxy.js"

const DEFAULT_TYPES = {
  game: [game()],
}

const DEFAULT_ENTITIES = {
  // eslint-disable-next-line no-magic-numbers
  game: { type: "game", bounds: [0, 0, 800, 600] }, // Default game entity with bounds.
}

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
  devMode = false,
}) {
  const listeners = new Set()
  let incomingEvents = []

  let types
  recomputeTypes()

  let entities
  recomputeEntities()

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
    getIncomingEvents: () => [...incomingEvents],
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
    state = produce(state, (state) => {
      incomingEvents.push({ type: "update", payload: dt })

      while (incomingEvents.length) {
        const event = incomingEvents.shift()

        if (event.type === "morph") {
          const { id, type } = event.payload
          originalTypes[id] = type
          recomputeTypes()
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
    if (devMode) {
      const proxiedEntities = new Proxy(
        state.entities,
        readOnlyStateProxyHandler(),
      )
      return { ...state, entities: proxiedEntities }
    }

    return state
  }

  function setState(newState) {
    state = newState
  }

  function reset() {
    state = initialState
    recomputeEntities()
  }

  function recomputeTypes() {
    types = extend(DEFAULT_TYPES, originalTypes)
    types = augmentTypes(types)
  }

  function recomputeEntities() {
    entities = extend(DEFAULT_ENTITIES, originalEntities)
    entities = augmentEntities(entities)
  }
}

function augmentTypes(types) {
  return pipe(applyDecorators)(types) //, enableMutability
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

function augmentEntities(entities) {
  return map(entities, augmentEntity)
}

function augmentEntity(id, entity) {
  return { ...entity, layer: entity.layer ?? DEFAULT_LAYER, id }
}
