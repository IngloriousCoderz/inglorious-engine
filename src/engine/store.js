import { filter, map } from "@inglorious/utils/data-structures/object.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pipe } from "@inglorious/utils/functions/functions.js"
import { produce } from "immer"

const DEFAULT_CONFIG = { types: { game: {} } }
const DEFAULT_STATE = {
  events: [],
  instances: { game: { type: "game", bounds: [0, 0, 800, 600] } }, // eslint-disable-line no-magic-numbers
}

export function createStore({ instances = {}, ...originalConfig }) {
  const listeners = new Set()
  let incomingEvents = []

  const config = merge({}, DEFAULT_CONFIG, originalConfig)
  const types = augment(config.types)

  let state = merge({}, DEFAULT_STATE, { instances })
  state = turnStateIntoFsm(state)

  return {
    subscribe,
    update,
    notify,
    dispatch: notify, // needed for react-redux
    getTypes,
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
        const handle = types[instance.type].states[instance.state][event.id]
        return (
          handle?.(instance, event, {
            dt,
            types,
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

  function getTypes() {
    return types
  }

  function getState() {
    return state
  }
}

function augment(types) {
  return pipe(applyDecorators, turnIntoFsm, enableMutability)(types)
}

function applyDecorators(types) {
  return map(types, (_, type) => {
    if (!Array.isArray(type)) {
      return type
    }

    const decorators = type.map((fn) =>
      typeof fn !== "function" ? () => fn : fn,
    )
    return pipe(...decorators)({})
  })
}

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

    return merge(
      typeWithoutTopLevelEventHandlers,
      { draw },
      {
        states: { default: topLevelEventHandlers },
      },
    )
  })
}

function enableMutability(types) {
  return map(types, (_, { states, ...rest }) => ({
    ...rest,
    states: map(states, (_, events) =>
      map(events, (_, event) => produce(event)),
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
