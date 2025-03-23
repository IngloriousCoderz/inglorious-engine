import { map } from "@inglorious/utils/data-structures/object.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { produce } from "immer"

const DEFAULT_STATE = { events: [], instances: { game: { type: "game" } } }

export function createStore({ instances = {}, ...config }) {
  const listeners = new Set()
  let incomingEvents = []

  config.types = enableMutability(config.types)

  let state = merge({}, DEFAULT_STATE, { instances })
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

    state.events.push({ id: "game:update" })

    state.events.push(...incomingEvents)
    incomingEvents = []

    while (state.events.length) {
      const event = state.events.shift()

      if (event.id === "instance:add") {
        add(event.payload.id, event.payload)
      }

      state.instances = map(state.instances, (_, instance) => {
        const handle =
          config.types[instance.type].states[instance.state][event.id]
        return (
          handle?.(instance, event, {
            dt,
            config,
            instances: state.instances,
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

  function add(id, instance) {
    state = { ...state }
    state.instances[id] = instance
    instance.state = instance.state ?? "default"
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
  return map(types, (_, { states, ...rest }) => ({
    ...rest,
    states: map(states, (_, events) =>
      map(events, (_, event) => produce(event))
    ),
  }))
}

function turnStateIntoFsm(state) {
  return {
    ...state,
    instances: map(state.instances, (id, instance) => ({
      ...instance,
      id,
      state: instance.state ?? "default",
    })),
  }
}
