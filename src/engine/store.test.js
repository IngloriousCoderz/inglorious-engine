import { expect, test } from 'vitest'

import { createStore } from './store'

test('it should add an event to the event queue', () => {
  const event = { id: 'something:happened' }
  const handlers = {
    kitty: {
      [event.id](entity) {
        return { ...entity, wasNotified: true }
      },
    },
  }
  const beforeState = {
    entities: {
      neko: { type: 'kitty' },
    },
  }
  const store = createStore({ handlers, state: beforeState })
  const afterState = {
    events: [event],
    entities: {
      neko: { type: 'kitty' },
    },
  }

  store.notify(event)
  store.update()

  const state = store.getState()
  expect(state).toEqual(afterState)
})

test('it should process the event queue', () => {
  const event = { id: 'something:happened' }
  const handlers = {
    kitty: {
      'game:update'(entity) {
        return { ...entity, wasUpdated: true }
      },

      [event.id](entity) {
        return { ...entity, wasNotified: true }
      },
    },
  }
  const beforeState = {
    events: [event],
    entities: {
      neko: { type: 'kitty' },
    },
  }
  const store = createStore({ handlers, state: beforeState })
  const afterState = {
    events: [],
    entities: {
      neko: {
        type: 'kitty',
        wasNotified: true,
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toEqual(afterState)
})

test('it should send an event from and entity', () => {
  const event = {
    id: 'doge:message',
    payload: { id: 'inu', message: 'Woof!' },
  }
  const handlers = {
    doge: {
      'game:update'(entity, _, { notify }) {
        notify(event)
        return entity
      },
    },
    kitty: {
      [event.id](entity) {
        // should do nothing at first
        return entity
      },
    },
  }
  const beforeState = {
    entities: {
      neko: {
        type: 'kitty',
        position: 'near',
      },
      inu: {
        type: 'doge',
      },
    },
  }
  const store = createStore({ handlers, state: beforeState })
  const afterState = {
    events: [event],
    entities: {
      neko: {
        type: 'kitty',
        position: 'near',
      },
      inu: {
        type: 'doge',
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toEqual(afterState)
})

test('it should receive an event from an entity', () => {
  const event = {
    id: 'doge:message',
    payload: { id: 'inu', message: 'Woof!' },
  }
  const handlers = {
    doge: {
      'game:update'(entity) {
        // no need to send further messages
        return entity
      },
    },
    kitty: {
      [event.id](entity, { payload }) {
        if (payload.id === 'inu' && payload.message === 'Woof!') {
          return { ...entity, position: 'far' }
        }

        return entity
      },
    },
  }
  const beforeState = {
    events: [event],
    entities: {
      neko: {
        type: 'kitty',
        position: 'near',
      },
      inu: {
        type: 'doge',
      },
    },
  }
  const store = createStore({ handlers, state: beforeState })
  const afterState = {
    events: [],
    entities: {
      neko: {
        type: 'kitty',
        position: 'far',
      },
      inu: {
        type: 'doge',
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toEqual(afterState)
})

test('it should mutate state in an immutable way', () => {
  const handlers = {
    kitty: {
      'game:update'(entity) {
        entity.wasUpdated = true
      },
    },
  }
  const beforeState = {
    entities: {
      neko: {
        type: 'kitty',
      },
    },
  }
  const store = createStore({ handlers, state: beforeState })
  const afterState = {
    events: [],
    entities: {
      neko: {
        type: 'kitty',
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toEqual(afterState)
  expect(state).not.toBe(beforeState)
})
