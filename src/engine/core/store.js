import { game } from "@inglorious/engine/behaviors/game.js"
import { map } from "@inglorious/utils/data-structures/object.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

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
 * @param {Object} options - Configuration options for the store.
 * @param {Object} options.entities - Initial entities to include in the store.
 * @param {Object} options.originalConfig - Additional configuration for the store.
 * @returns {Object} The store with methods to interact with state and events.
 */
export function createStore({
  types: originalTypes,
  entities: originalEntities,
}) {
  const listeners = new Set()
  let incomingEvents = []

  let types
  recomputeTypes()

  let entities
  recomputeEntities()

  let state = { events: [], entities }

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
   * @param {number} dt - The delta time since the last update in milliseconds.
   * @param {Object} api - The engine's public API.
   */
  function update(dt, api) {
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

      state.entities = map(state.entities, (_, entity) => {
        const type = types[entity.type]
        const handle = type[event.type]
        return (
          handle?.(entity, event.payload, {
            type: originalTypes[entity.type],
            api,
          }) ?? entity
        )
      })

      if (event.type === "remove") {
        remove(event.payload)
      }
    }

    listeners.forEach((onUpdate) => onUpdate())
  }

  /**
   * Adds a new entity to the state.
   * @param {string} id - The ID of the entity to add.
   * @param {Object} entity - The entity object to add.
   */
  function add(id, entity) {
    state = { ...state }
    state.entities[id] = augmentEntity(id, entity)
  }

  /**
   * Removes an entity from the state.
   * @param {string} id - The ID of the entity to remove.
   */
  function remove(id) {
    state = { ...state }
    delete state.entities[id]
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

  function recomputeEntities() {
    entities = extend(DEFAULT_ENTITIES, originalEntities)
    entities = augmentEntities(entities)
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

function augmentEntities(entities) {
  return map(entities, augmentEntity)
}

function augmentEntity(id, entity) {
  return { ...entity, layer: entity.layer ?? DEFAULT_LAYER, id }
}
