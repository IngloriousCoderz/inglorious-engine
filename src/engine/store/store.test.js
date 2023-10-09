import { expect, test } from 'vitest'

import { createStore } from '.'

test('it should add an event to the event queue', () => {
  const event = { id: 'something:happened' }
  const config = {
    types: {
      kitty: {
        [event.id](instance) {
          return { ...instance, wasNotified: true }
        },
      },
    },

    state: {
      instances: {
        instance1: { type: 'kitty' },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [event],
    instances: {
      game: {
        type: 'game',
        state: 'default',
      },
      instance1: {
        type: 'kitty',
        state: 'default',
      },
    },
  }

  store.notify(event)
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test('it should process the event queue', () => {
  const event = { id: 'something:happened' }
  const config = {
    types: {
      kitty: {
        'game:update'(instance) {
          return { ...instance, wasUpdated: true }
        },

        [event.id](instance) {
          return { ...instance, wasNotified: true }
        },
      },
    },
    state: {
      events: [event],
      instances: {
        instance1: { type: 'kitty' },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        type: 'game',
        state: 'default',
      },
      instance1: {
        type: 'kitty',
        state: 'default',
        wasNotified: true,
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test('it should send an event from an instance', () => {
  const event = {
    id: 'doge:message',
    payload: { id: 'inu', message: 'Woof!' },
  }
  const config = {
    types: {
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
    },
    state: {
      instances: {
        instance1: {
          type: 'kitty',
          position: 'near',
        },
        instance2: {
          type: 'doge',
        },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [event],
    instances: {
      game: {
        type: 'game',
        state: 'default',
      },
      instance1: {
        type: 'kitty',
        state: 'default',
        position: 'near',
      },
      instance2: {
        type: 'doge',
        state: 'default',
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
  const config = {
    types: {
      doge: {
        'game:update'(instance) {
          // no need to send further messages
          return instance
        },
      },
      kitty: {
        [event.id](instance, event) {
          if (event.payload.id === 'inu' && event.payload.message === 'Woof!') {
            return { ...instance, position: 'far' }
          }

          return instance
        },
      },
    },
    state: {
      events: [event],
      instances: {
        instance1: {
          type: 'kitty',
          position: 'near',
        },
        instance2: {
          type: 'doge',
        },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        type: 'game',
        state: 'default',
      },
      instance1: {
        type: 'kitty',
        state: 'default',
        position: 'far',
      },
      instance2: {
        type: 'doge',
        state: 'default',
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test('it should mutate state in an immutable way', () => {
  const config = {
    types: {
      kitty: {
        'game:update'(instance) {
          instance.wasUpdated = true
        },
      },
    },
    state: {
      instances: {
        instance1: {
          type: 'kitty',
        },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        type: 'game',
        state: 'default',
      },
      instance1: {
        type: 'kitty',
        state: 'default',
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
  expect(state).not.toBe(config.state)
})
