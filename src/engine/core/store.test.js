import { expect, test } from "vitest"

import { createStore } from "./store.js"

test("it should process events by mutating state inside handlers", () => {
  const config = {
    types: {
      kitty: {
        feed(entity) {
          entity.isFed = true
        },
        update(entity) {
          entity.isMeowing = true
        },
      },
    },
    entities: {
      kitty1: { type: "kitty" },
    },
  }
  const afterState = {
    entities: {
      kitty1: {
        id: "kitty1",
        type: "kitty",
        isFed: true,
        isMeowing: true,
      },
    },
  }

  const store = createStore(config)
  store.notify("feed")
  store.update(0, {})

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should send an event from an entity and process it in the same update cycle", () => {
  const config = {
    types: {
      doggo: {
        update(entity, dt, api) {
          api.notify("bark")
        },
      },
      kitty: {
        bark(entity) {
          entity.position = "far"
        },
      },
    },
    entities: {
      doggo1: { type: "doggo" },
      kitty1: { type: "kitty", position: "near" },
    },
  }
  const afterState = {
    entities: {
      doggo1: { id: "doggo1", type: "doggo" },
      kitty1: { id: "kitty1", type: "kitty", position: "far" },
    },
  }

  const store = createStore(config)
  const api = { notify: store.notify }
  store.update(0, api)

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})

test("it should add an entity via an 'add' event", () => {
  const config = {
    types: {
      kitty: {},
    },
    entities: {},
  }
  const newEntity = { id: "kitty1", type: "kitty" }

  const store = createStore(config)
  store.notify("add", newEntity)
  store.update(0, {})

  const state = store.getState()
  expect(state).toStrictEqual({
    entities: {
      kitty1: { id: "kitty1", type: "kitty" },
    },
  })
})

test("it should remove an entity via a 'remove' event", () => {
  const config = {
    types: {},
    entities: {
      kitty1: { type: "kitty" },
    },
  }
  const store = createStore(config)

  store.notify("remove", "kitty1")

  store.update(0, {})

  const state = store.getState()
  expect(state.entities.kitty1).toBeUndefined()
})
