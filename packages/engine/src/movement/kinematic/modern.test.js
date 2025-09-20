import { v } from "@inglorious/utils/v.js"
import { expect, test } from "vitest"

import { modernMove } from "./modern.js"

test("it should move following its velocity", () => {
  const entity = { maxSpeed: 1, velocity: v(1, 0, 0), position: v(0, 0, 0) }
  const dt = 1
  const expectedResult = {
    velocity: v(1, 0, 0),
    position: v(1, 0, 0),
    orientation: 0,
  }

  expect(modernMove(entity, dt)).toStrictEqual(expectedResult)
})

test("it should limit the velocity to the max speed", () => {
  const entity = { maxSpeed: 1, velocity: v(10, 0, 0), position: v(0, 0, 0) }
  const dt = 1
  const expectedResult = {
    velocity: v(1, 0, 0),
    position: v(1, 0, 0),
    orientation: 0,
  }

  expect(modernMove(entity, dt)).toStrictEqual(expectedResult)
})
