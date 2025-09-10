import { produce } from "immer"

import { augmentEntities, augmentEntity } from "./entities.js"
import { EventMap } from "./event-map.js"
import { augmentType, augmentTypes } from "./types.js"

/**
 * Creates a store to manage state and events.
 *
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

  const types = augmentTypes(originalTypes)

  let state, eventMap, incomingEvents
  reset()

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
   *
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
   *
   * @param {number} dt - The delta time since the last update in milliseconds.
   * @param {Object} api - The engine's public API.
   */
  function update(api) {
    const processedEvents = []

    state = produce(state, (state) => {
      while (incomingEvents.length) {
        const event = incomingEvents.shift()
        processedEvents.push(event)

        if (event.type === "morph") {
          const { id, type } = event.payload

          const entity = state.entities[id]
          const oldType = types[entity.type]

          originalTypes[id] = type
          types[id] = augmentType(originalTypes[id])
          const newType = types[id]

          eventMap.removeEntity(id, oldType)
          eventMap.addEntity(id, newType)
        }

        if (event.type === "add") {
          const { id, ...entity } = event.payload
          state.entities[id] = augmentEntity(id, entity)
          const type = types[entity.type]

          eventMap.addEntity(id, type)
          incomingEvents.unshift({ type: "create", payload: id })
        }

        if (event.type === "remove") {
          const id = event.payload
          const entity = state.entities[id]
          const type = types[entity.type]
          delete state.entities[id]

          eventMap.removeEntity(id, type)
          incomingEvents.unshift({ type: "destroy", payload: id })
        }

        const entityIds = eventMap.getEntitiesForEvent(event.type)
        for (const id of entityIds) {
          const entity = state.entities[id]
          const type = types[entity.type]
          const handle = type[event.type]
          handle(entity, event.payload, api)
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
   *
   * @param {string} type - The event object type to notify.
   * @param {any} payload - The event object payload to notify.
   */
  function notify(type, payload) {
    dispatch({ type, payload })
  }

  /**
   * Dispatches an event to be processed in the next update cycle.
   *
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
   *
   * @returns {Object} The augmented types configuration.
   */
  function getTypes() {
    return types
  }

  /**
   * Retrieves the original, un-augmented types configuration.
   *
   * @returns {Object} The original types configuration.
   */
  function getOriginalTypes() {
    return originalTypes
  }

  /**
   * Retrieves the current state.
   *
   * @returns {Object} The current state.
   */
  function getState() {
    return state
  }

  /**
   * Sets the entire state of the store.
   * This is useful for importing state or setting initial state from a server.
   *
   * @param {Object} nextState - The new state to set.
   */
  function setState(nextState) {
    const oldEntities = state?.entities ?? {}
    const newEntities = augmentEntities(nextState.entities)

    state = { entities: newEntities }
    eventMap = new EventMap(types, nextState.entities)
    incomingEvents = []

    const oldEntityIds = new Set(Object.keys(oldEntities))
    const newEntityIds = new Set(Object.keys(newEntities))

    const entitiesToCreate = [...newEntityIds].filter(
      (id) => !oldEntityIds.has(id),
    )
    const entitiesToDestroy = [...oldEntityIds].filter(
      (id) => !newEntityIds.has(id),
    )

    entitiesToCreate.forEach((id) => {
      incomingEvents.push({ type: "create", payload: id })
    })

    entitiesToDestroy.forEach((id) => {
      incomingEvents.push({ type: "destroy", payload: id })
    })
  }

  /**
   * Resets the store to its initial state.
   */
  function reset() {
    setState({ entities: originalEntities })
  }
}
