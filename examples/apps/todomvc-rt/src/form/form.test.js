import { it, expect } from "vitest"
import { createStore } from "@inglorious/store"

import { form } from "./form"

it("should update the form value on inputChange", () => {
  const stateBefore = {
    form: { id: "form", type: "form", value: "" },
  }
  const event = { type: "inputChange", payload: "Hello world!" }
  const stateAfter = {
    form: { id: "form", type: "form", value: "Hello world!" },
  }

  doTest(stateBefore, event, stateAfter)
})

it("should clear the form value on formSubmit", () => {
  const stateBefore = {
    form: { id: "form", type: "form", value: "Hello world!" },
  }
  const event = { type: "formSubmit", payload: "Hello world!" }
  const stateAfter = {
    form: { id: "form", type: "form", value: "" },
  }

  doTest(stateBefore, event, stateAfter)
})

function doTest(stateBefore, event, stateAfter) {
  const store = createStore({ types: { form }, entities: stateBefore })

  store.dispatch(event)
  const state = store.getState()

  expect(state).toEqual(stateAfter)
}
