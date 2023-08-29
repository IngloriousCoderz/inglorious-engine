import { expect, test } from 'vitest'

import { createStore } from './store'

test('it should add an event to the event queue', () => {
  const event = { id: 'something:happened' }
  const types = {
    kitty: {
      [event.id](instance) {
        return { ...instance, wasNotified: true }
      },
    },
  }
  const beforeState = {
    instances: {
      neko: { type: 'kitty' },
    },
  }
  const store = createStore({ types, state: beforeState })
  const afterState = {
    events: [event],
    instances: {
      neko: { type: 'kitty' },
    },
  }

  store.notify(event)
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test('it should process the event queue', () => {
  const event = { id: 'something:happened' }
  const types = {
    kitty: {
      'game:update'(instance) {
        return { ...instance, wasUpdated: true }
      },

      [event.id](instance) {
        return { ...instance, wasNotified: true }
      },
    },
  }
  const beforeState = {
    events: [event],
    instances: {
      neko: { type: 'kitty' },
    },
  }
  const store = createStore({ types, state: beforeState })
  const afterState = {
    events: [],
    instances: {
      neko: {
        type: 'kitty',
        wasNotified: true,
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test('it should send an event from and instance', () => {
  const event = {
    id: 'doge:message',
    payload: { id: 'inu', message: 'Woof!' },
  }
  const types = {
    doge: {
      'game:update'(instance, _, { notify }) {
        notify(event)
        return instance
      },
    },
    kitty: {
      [event.id](instance) {
        // should do nothing at first
        return instance
      },
    },
  }
  const beforeState = {
    instances: {
      neko: {
        type: 'kitty',
        position: 'near',
      },
      inu: {
        type: 'doge',
      },
    },
  }
  const store = createStore({ types, state: beforeState })
  const afterState = {
    events: [event],
    instances: {
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
  expect(state).toStrictEqual(afterState)
})

test('it should receive an event from an instance', () => {
  const event = {
    id: 'doge:message',
    payload: { id: 'inu', message: 'Woof!' },
  }
  const types = {
    doge: {
      'game:update'(instance) {
        // no need to send further messages
        return instance
      },
    },
    kitty: {
      [event.id](instance, { payload }) {
        if (payload.id === 'inu' && payload.message === 'Woof!') {
          return { ...instance, position: 'far' }
        }

        return instance
      },
    },
  }
  const beforeState = {
    events: [event],
    instances: {
      neko: {
        type: 'kitty',
        position: 'near',
      },
      inu: {
        type: 'doge',
      },
    },
  }
  const store = createStore({ types, state: beforeState })
  const afterState = {
    events: [],
    instances: {
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
  expect(state).toStrictEqual(afterState)
})

test('it should mutate state in an immutable way', () => {
  const types = {
    kitty: {
      'game:update'(instance) {
        instance.wasUpdated = true
      },
    },
  }
  const beforeState = {
    instances: {
      neko: {
        type: 'kitty',
      },
    },
  }
  const store = createStore({ types, state: beforeState })
  const afterState = {
    events: [],
    instances: {
      neko: {
        type: 'kitty',
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
  expect(state).not.toBe(beforeState)
})
