import { createStore } from "@inglorious/engine/store"
import { expect, test } from "vitest"

import { enableFsm } from "./fsm"

test("it should add a finite state machine", () => {
  const config = {
    types: {
      kitty: [
        enableFsm({
          default: {
            "cat:meow"(instance) {
              instance.state = "meowing"
            },
          },
          meowing: {
            "game:update"(instance) {
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
        bounds: [0, 0, 800, 600],
      },
      instance1: {
        id: "instance1",
        type: "kitty",
        state: "meowing",
        treats: 1,
      },
    },
  }

  store.notify({ id: "cat:meow" })
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})
