import { createStore } from "@inglorious/engine/core/store.js"
import { expect, test } from "vitest"

import { fsm } from "./fsm.js"

test("it should add a finite state machine", () => {
  const config = {
    types: {
      kitty: [
        fsm({
          default: {
            catMeow(entity) {
              entity.state = "meowing"
            },
          },
          meowing: {
            update(entity) {
              entity.treats++
            },
          },
        }),
      ],
    },
    entities: {
      entity1: {
        type: "kitty",
        treats: 0,
      },
    },
  }
  const afterState = {
    entities: {
      entity1: {
        id: "entity1",
        type: "kitty",
        state: "meowing",
        treats: 1,
      },
    },
  }

  const store = createStore(config)
  store.notify("start")
  store.notify("catMeow")
  store.update()

  const state = store.getState()
  expect(state).toStrictEqual(afterState)
})
