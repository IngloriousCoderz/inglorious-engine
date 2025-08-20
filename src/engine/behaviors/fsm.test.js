import { createStore } from "@inglorious/engine/core/store"
import { expect, test } from "vitest"

import { fsm } from "./fsm"

test("it should add a finite state machine", () => {
  const config = {
    types: {
      kitty: [
        fsm({
          default: {
            catMeow(instance) {
              instance.state = "meowing"
            },
          },
          meowing: {
            update(instance) {
              instance.treats++
            },
          },
        }),
      ],
    },
    instances: {
      instance1: {
        type: "kitty",
        treats: 0,
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
        state: "meowing",
        treats: 1,
      },
    },
  }

  store.notify("catMeow")
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})
