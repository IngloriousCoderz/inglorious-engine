import { it, expect } from "vitest"
import { createStore } from "@inglorious/store"

import { footer } from "./footer"

it("should update the filter on filterClick", () => {
  const stateBefore = {
    footer: { id: "footer", type: "footer", activeFilter: "all" },
  }
  const event = { type: "filterClick", payload: "completed" }
  const stateAfter = {
    footer: { id: "footer", type: "footer", activeFilter: "completed" },
  }

  doTest(stateBefore, event, stateAfter)
})

function doTest(stateBefore, event, stateAfter) {
  const store = createStore({ types: { footer }, entities: stateBefore })

  store.dispatch(event)
  const state = store.getState()

  expect(state).toEqual(stateAfter)
}
