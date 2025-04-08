import { expect, test } from "vitest"

import { createStore } from "./store.js"

test("it should add an event to the event queue", () => {
  const event = { id: "something:happened" }
  const config = {
    types: {
      kitty: {
        [event.id](instance) {
          return { ...instance, wasNotified: true }
        },
      },
    },
    instances: {
      instance1: { type: "kitty" },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        wasNotified: true,
      },
    },
  }

  store.notify(event)
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should process the event queue", () => {
  const event = { id: "something:happened" }
  const config = {
    types: {
      kitty: {
        "game:update"(instance) {
          return { ...instance, wasUpdated: true }
        },

        [event.id](instance) {
          return { ...instance, wasNotified: true }
        },
      },
    },
    instances: {
      instance1: { type: "kitty" },
    },
  }
  const store = createStore(config)
  store.notify(event)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        wasNotified: true,
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should send an event from an instance", () => {
  const event = {
    id: "doge:message",
    payload: { id: "inu", message: "Woof!" },
  }
  const config = {
    types: {
      doge: {
        "game:update"(instance, event, { instances, notify }) {
          if (instances.instance2.position === "near") {
            notify(event)
          }
        },
      },
      kitty: {
        [event.id](instance) {
          if (event.payload.id === "inu" && event.payload.message === "Woof!") {
            instance.position = "far"
          }
        },
      },
    },

    instances: {
      instance1: {
        type: "doge",
      },
      instance2: {
        type: "kitty",
        position: "near",
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "doge",
      },
      instance2: {
        id: "instance2",
        type: "kitty",
        position: "near", // should do nothing at first
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should receive an event from an instance", () => {
  const event = {
    id: "doge:message",
    payload: { id: "inu", message: "Woof!" },
  }
  const config = {
    types: {
      doge: {
        "game:update"(instance, event, { instances, notify }) {
          if (instances.instance2.position === "near") {
            notify(event)
          }
        },
      },
      kitty: {
        [event.id](instance, event) {
          if (event.payload.id === "inu" && event.payload.message === "Woof!") {
            instance.position = "far"
          }
        },
      },
    },

    instances: {
      instance1: {
        type: "doge",
      },
      instance2: {
        type: "kitty",
        position: "near",
      },
    },
  }
  const store = createStore(config)
  store.notify(event)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "doge",
      },
      instance2: {
        id: "instance2",
        type: "kitty",
        position: "far", // position changed
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should mutate state in an immutable way", () => {
  const config = {
    types: {
      kitty: {
        "game:update"(instance) {
          instance.wasUpdated = true
        },
      },
    },

    instances: {
      instance1: {
        type: "kitty",
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})
