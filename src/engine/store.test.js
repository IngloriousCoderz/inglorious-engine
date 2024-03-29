import { expect, test } from 'vitest'

import { createStore } from './store.js'

test('it should add an event to the event queue', () => {
  const event = { id: 'something:happened' }
  const config = {
    types: {
      game: { states: { default: {} } },
      kitty: {
        states: {
          default: {
            [event.id](instance) {
              return { ...instance, wasNotified: true }
            },
          },
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
    events: [],
    instances: {
      game: {
        id: 'game',
        type: 'game',
        state: 'default',
      },
      instance1: {
        id: 'instance1',
        type: 'kitty',
        state: 'default',
        wasNotified: true,
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
      game: { states: { default: {} } },
      kitty: {
        states: {
          default: {
            'game:update'(instance) {
              return { ...instance, wasUpdated: true }
            },

            [event.id](instance) {
              return { ...instance, wasNotified: true }
            },
          },
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
        id: 'game',
        type: 'game',
        state: 'default',
      },
      instance1: {
        id: 'instance1',
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
      game: { states: { default: {} } },
      doge: {
        states: {
          default: {
            'game:update'(instance, event, { instances, notify }) {
              if (instances.instance2.position === 'near') {
                notify(event)
              }
            },
          },
        },
      },
      kitty: {
        states: {
          default: {
            [event.id](instance) {
              if (
                event.payload.id === 'inu' &&
                event.payload.message === 'Woof!'
              ) {
                instance.position = 'far'
              }
            },
          },
        },
      },
    },

    state: {
      instances: {
        instance1: {
          type: 'doge',
        },
        instance2: {
          type: 'kitty',
          position: 'near',
        },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: 'game',
        type: 'game',
        state: 'default',
      },
      instance1: {
        id: 'instance1',
        type: 'doge',
        state: 'default',
      },
      instance2: {
        id: 'instance2',
        type: 'kitty',
        state: 'default',
        position: 'near', // should do nothing at first
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
      game: { states: { default: {} } },
      doge: {
        states: {
          default: {
            'game:update'(instance, event, { instances, notify }) {
              if (instances.instance2.position === 'near') {
                notify(event)
              }
            },
          },
        },
      },
      kitty: {
        states: {
          default: {
            [event.id](instance, event) {
              if (
                event.payload.id === 'inu' &&
                event.payload.message === 'Woof!'
              ) {
                instance.position = 'far'
              }
            },
          },
        },
      },
    },

    state: {
      events: [event],
      instances: {
        instance1: {
          type: 'doge',
        },
        instance2: {
          type: 'kitty',
          position: 'near',
        },
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: 'game',
        type: 'game',
        state: 'default',
      },
      instance1: {
        id: 'instance1',
        type: 'doge',
        state: 'default',
      },
      instance2: {
        id: 'instance2',
        type: 'kitty',
        state: 'default',
        position: 'far', // position changed
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
      game: { states: { default: {} } },
      kitty: {
        states: {
          default: {
            'game:update'(instance) {
              instance.wasUpdated = true
            },
          },
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
        id: 'game',
        type: 'game',
        state: 'default',
      },
      instance1: {
        id: 'instance1',
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
