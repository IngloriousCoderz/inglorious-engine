import produce from 'immer'

import { map, merge } from '../../utils/objects'

const DEFAULT_TYPES = { game: {} }
const DEFAULT_STATE = { events: [], instances: { game: { type: 'game' } } }

export function createStore({ types: initialTypes, state: initialState }) {
  const listeners = new Set()
  let incomingEvents = []

  let types = merge({}, DEFAULT_TYPES, initialTypes)
  let state = merge({}, DEFAULT_STATE, initialState)

  Object.values(types).forEach((events) =>
    Object.keys(events).forEach((id) => {
      events[id] = produce(events[id])
    })
  )

  return {
    subscribe,
    update,
    add,
    remove,
    notify,
    dispatch: notify,
    getState,
  }

  function subscribe(listener) {
    listeners.add(listener)

    return function unsubscribe() {
      listeners.delete(listener)
    }
  }

  function update(elapsed) {
    state = { ...state }

    state.events.push({ id: 'game:update' })

    while (state.events.length) {
      const event = state.events.shift()

      state.instances = map(state.instances, (_, instance) => {
        const handle = types[instance.type][event.id]
        return (
          (handle &&
            handle(instance, event, {
              instances: state.instances,
              elapsed,
              notify,
            })) ||
          instance
        )
      })
    }

    state.events.push(...incomingEvents)
    incomingEvents = []

    listeners.forEach((onUpdate) => onUpdate())
  }

  function add(id, instance) {
    state = { ...state }
    state.instances[id] = instance

    listeners.forEach((onUpdate) => onUpdate())
  }

  function remove(id) {
    state = { ...state }
    delete state.instances[id]

    listeners.forEach((onUpdate) => onUpdate())
  }

  function notify(event) {
    incomingEvents.push(event)
  }

  function getState() {
    return state
  }
}
