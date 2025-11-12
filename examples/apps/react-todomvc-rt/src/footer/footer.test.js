import { it, expect } from "vitest"
import { trigger } from "@inglorious/store/test"

import { footer } from "./footer"

it("should update the filter on filterClick", () => {
  const entityBefore = {
    id: "footer",
    type: "footer",
    activeFilter: "all",
  }
  const event = { type: "filterClick", payload: "completed" }
  const entityAfter = {
    id: "footer",
    type: "footer",
    activeFilter: "completed",
  }

  const { entity } = trigger(entityBefore, footer[event.type], event.payload)

  expect(entity).toEqual(entityAfter)
})
