import { filter, map } from '@inglorious/utils/data-structures/object'
import { merge } from '@inglorious/utils/data-structures/objects'
import produce from 'immer'

const DEFAULT_TYPES = { game: {} }
const DEFAULT_STATE = { events: [], instances: { game: { type: 'game' } } }

export function createStore({ state: initialState, ...config }) {
  const listeners = new Set()
  let incomingEvents = []

  const initialTypes = config.types
  config.types = merge({}, DEFAULT_TYPES, initialTypes)
  config.types = turnTypesIntoFsm(config.types)
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

    while (state.events.length) {
      const event = state.events.shift()

      if (event.id === 'instance:add') {
        const { id, ...rest } = event.payload
        add(id, rest)
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

    state.events.push(...incomingEvents)
    incomingEvents = []

    listeners.forEach((onUpdate) => onUpdate())
  }

  function add(id, instance) {
    state = { ...state }
    state.instances[id] = instance
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

function turnTypesIntoFsm(types) {
  return map(types, (id, type) => {
    const isFsm = Object.keys(type).some((key) => key === 'states')
    if (isFsm) {
      return type
    }

    const eventHandlers = filter(
      type,
      (_, value) => typeof value === 'function'
    )
    const typeWithoutEventHandlers = filter(
      type,
      (_, value) => typeof value !== 'function'
    )

    return merge(typeWithoutEventHandlers, {
      states: { default: eventHandlers },
    })
  })
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
    instances: map(state.instances, (id, instance) =>
      instance.state == null ? { ...instance, state: 'default' } : instance
    ),
  }
}
