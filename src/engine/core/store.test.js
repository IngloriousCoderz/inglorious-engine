import { expect, test } from "vitest"

import { createStore } from "./store.js"

test("it should add an event to the event queue", () => {
  const event = "somethingHappened"
  const config = {
    types: {
      kitty: {
        [event](instance) {
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
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        layer: 0,
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
  const event = "somethingHappened"
  const config = {
    types: {
      kitty: {
        update(instance) {
          return { ...instance, wasUpdated: true }
        },

        [event](instance) {
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
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        layer: 0,
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
  const config = {
    types: {
      doggo: {
        update(instance, dt, { instances, notify }) {
          if (instances.instance2.position === "near") {
            notify("doggoMessage", { id: "inu", message: "Woof!" })
          }
        },
      },
      kitty: {
        doggoMessage(instance, { id, message }) {
          if (id === "inu" && message === "Woof!") {
            instance.position = "far"
          }
        },
      },
    },

    instances: {
      instance1: {
        type: "doggo",
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
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "doggo",
        layer: 0,
      },
      instance2: {
        id: "instance2",
        type: "kitty",
        layer: 0,
        position: "near", // should do nothing at first
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should receive an event from an instance", () => {
  const event = "doggoMessage"
  const payload = { id: "inu", message: "Woof!" }

  const config = {
    types: {
      doggo: {
        update(instance, dt, { instances, notify }) {
          if (instances.instance2.position === "near") {
            notify("doggoMessage", { id: "inu", message: "Woof!" })
          }
        },
      },
      kitty: {
        doggoMessage(instance, { id, message }) {
          if (id === "inu" && message === "Woof!") {
            instance.position = "far"
          }
        },
      },
    },

    instances: {
      instance1: {
        type: "doggo",
      },
      instance2: {
        type: "kitty",
        position: "near",
      },
    },
  }
  const store = createStore(config)
  store.notify(event, payload)
  const afterState = {
    events: [],
    instances: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "doggo",
        layer: 0,
      },
      instance2: {
        id: "instance2",
        type: "kitty",
        layer: 0,
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
        update(instance) {
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
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        layer: 0,
        wasUpdated: true,
      },
    },
  }

  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})
