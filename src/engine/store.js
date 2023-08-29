import produce from 'immer'

const DEFAULT_STATE = { events: [], instances: {} }

export function createStore({ types = {}, state: initialState }) {
  const listeners = new Set()
  let incomingEvents = []
  let state = { ...DEFAULT_STATE, ...initialState }

  Object.values(types).forEach((events) =>
    Object.keys(events).forEach((id) => {
      events[id] = produce(events[id])
    })
  )

  return {
    subscribe,
    update,
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
    state = {
      ...state,
      events: [...state.events, { id: 'game:update' }],
    }

    while (state.events.length) {
      const [event, ...rest] = state.events

      if (event.id === 'engine:stop') {
        state = { ...state, shouldQuit: true }
      }

      const handleEvent = createHandleEvent(event, { elapsed, notify })

      state = {
        ...state,
        events: rest,
        instances: Object.keys(state.instances).reduce((acc, id) => {
          acc[id] = handleEvent(state.instances[id])
          return acc
        }, {}),
      }
    }

    state = {
      ...state,
      events: [...state.events, ...incomingEvents],
    }
    incomingEvents = []

    listeners.forEach((onUpdate) => onUpdate())
  }

  function remove(id) {
    state = {
      ...state,
      instances: { ...state.entries, [id]: undefined },
    }
  }

  function notify(event) {
    incomingEvents.push(event)
  }

  function getState() {
    return state
  }

  function createHandleEvent(event, options) {
    return (instance) => {
      const handle = types[instance.type][event.id]
      return (handle && handle(instance, event, options)) || instance
    }
  }
}
