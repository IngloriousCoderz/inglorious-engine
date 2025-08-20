import { expect, test } from "vitest"

import { createStore } from "./store.js"

test("it should add an event to the event queue", () => {
  const event = "somethingHappened"
  const config = {
    types: {
      kitty: {
        [event](entity) {
          return { ...entity, wasNotified: true }
        },
      },
    },
    entities: {
      entity1: { type: "kitty" },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    entities: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      entity1: {
        id: "entity1",
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
        update(entity) {
          return { ...entity, wasUpdated: true }
        },

        [event](entity) {
          return { ...entity, wasNotified: true }
        },
      },
    },
    entities: {
      entity1: { type: "kitty" },
    },
  }
  const store = createStore(config)
  store.notify(event)
  const afterState = {
    events: [],
    entities: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      entity1: {
        id: "entity1",
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

test("it should send an event from an entity", () => {
  const config = {
    types: {
      doggo: {
        update(entity, dt, { entities, notify }) {
          if (entities.entity2.position === "near") {
            notify("doggoMessage", { id: "inu", message: "Woof!" })
          }
        },
      },
      kitty: {
        doggoMessage(entity, { id, message }) {
          if (id === "inu" && message === "Woof!") {
            entity.position = "far"
          }
        },
      },
    },

    entities: {
      entity1: {
        type: "doggo",
      },
      entity2: {
        type: "kitty",
        position: "near",
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    entities: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      entity1: {
        id: "entity1",
        type: "doggo",
        layer: 0,
      },
      entity2: {
        id: "entity2",
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

test("it should receive an event from an entity", () => {
  const event = "doggoMessage"
  const payload = { id: "inu", message: "Woof!" }

  const config = {
    types: {
      doggo: {
        update(entity, dt, { entities, notify }) {
          if (entities.entity2.position === "near") {
            notify("doggoMessage", { id: "inu", message: "Woof!" })
          }
        },
      },
      kitty: {
        doggoMessage(entity, { id, message }) {
          if (id === "inu" && message === "Woof!") {
            entity.position = "far"
          }
        },
      },
    },

    entities: {
      entity1: {
        type: "doggo",
      },
      entity2: {
        type: "kitty",
        position: "near",
      },
    },
  }
  const store = createStore(config)
  store.notify(event, payload)
  const afterState = {
    events: [],
    entities: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      entity1: {
        id: "entity1",
        type: "doggo",
        layer: 0,
      },
      entity2: {
        id: "entity2",
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
        update(entity) {
          entity.wasUpdated = true
        },
      },
    },

    entities: {
      entity1: {
        type: "kitty",
      },
    },
  }
  const store = createStore(config)
  const afterState = {
    events: [],
    entities: {
      game: {
        id: "game",
        type: "game",
        layer: 0,
        bounds: [0, 0, 800, 600],
      },
      entity1: {
        id: "entity1",
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
