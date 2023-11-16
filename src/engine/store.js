import { map } from '@inglorious/utils/data-structures/object.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import produce from 'immer'

const DEFAULT_STATE = { events: [], instances: { game: { type: 'game' } } }

export function createStore({ state: initialState, ...config }) {
  const listeners = new Set()
  let incomingEvents = []

  config.types = enableMutability(config.types)

  let state = merge({}, DEFAULT_STATE, initialState)
  state = turnStateIntoFsm(state)

  return {
    subscribe,
    update,
    notify,
    dispatch: notify, // needed for react-redux
    getState,
  }

  function subscribe(listener) {
    listeners.add(listener)

    return function unsubscribe() {
      listeners.delete(listener)
    }
  }

  function update(dt) {
    state = { ...state }

    state.events.push({ id: 'game:update' })

    state.events.push(...incomingEvents)
    incomingEvents = []

    while (state.events.length) {
      const event = state.events.shift()

      if (event.id === 'instance:add') {
        add(event.payload)
      }

      state.instances = map(state.instances, (id, instance) => {
        const handle =
          config.types[instance.type].states[instance.state][event.id]
        return handle
          ? handle(instance, event, {
              dt,
              config: config,
              instances: state.instances,
              notify,
            })
          : instance
      })

      if (event.id === 'instance:remove') {
        remove(event.payload)
      }
    }

    listeners.forEach((onUpdate) => onUpdate())
  }

  function add(instance) {
    state = { ...state }
    state.instances[instance.id] = instance
    instance.state = instance.state ?? 'default'
  }

  function remove(id) {
    state = { ...state }
    delete state.instances[id]
  }

  function notify(event) {
    incomingEvents.push(event)
  }

  function getState() {
    return state
  }
}

function enableMutability(types) {
  return map(types, (typeId, { states, ...rest }) => ({
    ...rest,
    states: map(states, (stateId, events) =>
      map(events, (eventId, event) => produce(event))
    ),
  }))
}

function turnStateIntoFsm(state) {
  return {
    ...state,
    instances: map(state.instances, (id, instance) => ({
      ...instance,
      id,
      state: instance.state || 'default',
    })),
  }
}
