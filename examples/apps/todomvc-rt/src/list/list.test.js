import { it, expect } from "vitest"
import { createStore } from "@inglorious/store"

import { list } from "./list"

it("should add a new task on formSubmit", () => {
  const stateBefore = {
    list: { id: "list", type: "list", tasks: [] },
  }
  const event = { type: "formSubmit", payload: "Hello world!" }
  const stateAfter = {
    list: {
      id: "list",
      type: "list",
      tasks: [{ id: 1, text: "Hello world!" }],
    },
  }

  doTest(stateBefore, event, stateAfter)
})

it("should toggle a task as completed on toggleClick", () => {
  const stateBefore = {
    list: {
      id: "list",
      type: "list",
      tasks: [{ id: 1, text: "Hello world!", completed: false }],
    },
  }
  const event = { type: "toggleClick", payload: 1 }
  const stateAfter = {
    list: {
      id: "list",
      type: "list",
      tasks: [{ id: 1, text: "Hello world!", completed: true }],
    },
  }

  doTest(stateBefore, event, stateAfter)
})

it("should delete a task on deleteClick", () => {
  const stateBefore = {
    list: {
      id: "list",
      type: "list",
      tasks: [{ id: 1, text: "Hello world!", completed: false }],
    },
  }
  const event = { type: "deleteClick", payload: 1 }
  const stateAfter = {
    list: { id: "list", type: "list", tasks: [] },
  }

  doTest(stateBefore, event, stateAfter)
})

it("should clear all completed tasks on clearClick", () => {
  const stateBefore = {
    list: {
      id: "list",
      type: "list",
      tasks: [{ id: 1, text: "Hello world!", completed: true }],
    },
  }
  const event = { type: "clearClick" }
  const stateAfter = {
    list: { id: "list", type: "list", tasks: [] },
  }

  doTest(stateBefore, event, stateAfter)
})

function doTest(stateBefore, event, stateAfter) {
  const store = createStore({ types: { list }, entities: stateBefore })

  store.dispatch(event)
  const state = store.getState()

  expect(state).toEqual(stateAfter)
}
