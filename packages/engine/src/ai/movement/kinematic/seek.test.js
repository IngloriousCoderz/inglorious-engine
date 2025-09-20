import { v } from "@inglorious/utils/math/linear-algebra/vector.js"
import { expect, test } from "vitest"

import { seek } from "./seek.js"

test("it should move toward the target", () => {
  const entity = { maxSpeed: 1, position: v(0, 0, 0) }
  const target = { position: v(2, 0, 0) }
  const dt = 1
  const expectedResult = {
    position: v(1, 0, 0),
    velocity: v(1, 0, 0),
    orientation: 0,
  }

  expect(seek(entity, target, dt)).toStrictEqual(expectedResult)
})

test("it should eventually reach the target", () => {
  const entity = { maxSpeed: 1, position: v(0, 0, 0) }
  const target = { position: v(2, 0, 0) }
  const dt = 2
  const expectedResult = {
    position: v(2, 0, 0),
    velocity: v(1, 0, 0),
    orientation: 0,
  }

  expect(seek(entity, target, dt)).toStrictEqual(expectedResult)
})

test("it should overshoot when speed is too high", () => {
  const entity = { maxSpeed: 10, position: v(0, 0, 0) }
  const target = { position: v(2, 0, 0) }
  const dt = 1
  const expectedResult = {
    position: v(10, 0, 0),
    velocity: v(10, 0, 0),
    orientation: 0,
  }

  expect(seek(entity, target, dt)).toStrictEqual(expectedResult)
})
