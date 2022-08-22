const UPDATE = `game:update`
const NUM_LISTENERS_TO_REMOVE = 1
const FIRST_EVENT_INDEX = 0

const DEFAULT_STATE = { events: [], entities: [] }

module.exports = { createStore }

function createStore(initialHandlers, initialState) {
  const listeners = []
  const incomingEvents = []
  const handlers = { ...initialHandlers }
  let state = { ...DEFAULT_STATE, ...initialState }

  return { subscribe, update, remove, notify, getState }

  function subscribe(listener) {
    listeners.push(listener)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, NUM_LISTENERS_TO_REMOVE)
    }
  }

  function update(elapsed) {
    state = {
      ...state,
      events: [...state.events, { id: UPDATE }],
    }

    while (state.events.length) {
      const [event, ...rest] = state.events
      const handleEvent = createHandleEvent(event, { elapsed, notify })

      state = {
        ...state,
        events: rest,
        entities: state.entities.map(handleEvent),
      }
    }

    state = {
      ...state,
      events: [...state.events, ...incomingEvents],
    }
    incomingEvents.splice(FIRST_EVENT_INDEX, incomingEvents.length)

    listeners.forEach((onUpdate) => onUpdate())
  }

  function remove(id) {
    state = {
      ...state,
      entities: state.entities.filter((entity) => entity.id === id),
    }
  }

  function notify(event) {
    incomingEvents.push(event)
  }

  function getState() {
    return state
  }

  function createHandleEvent(event, options) {
    return (entity) => {
      const handle = handlers[entity.type][event.id]
      return (handle && handle(entity, event, options)) || entity
    }
  }
}
