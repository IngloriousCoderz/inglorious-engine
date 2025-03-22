import { expect, test } from "vitest"

import move from "./move.js"

test("it should move following its velocity", () => {
  const instance = { maxSpeed: 1, velocity: [1, 0, 0], position: [0, 0, 0] }
  const options = { dt: 1 }
  const expectedResult = {
    velocity: [1, 0, 0],
    position: [1, 0, 0],
    orientation: 0,
  }

  expect(move(instance, options)).toStrictEqual(expectedResult)
})

test("it should limit the velocity to the max speed", () => {
  const instance = { maxSpeed: 1, velocity: [10, 0, 0], position: [0, 0, 0] }
  const options = { dt: 1 }
  const expectedResult = {
    velocity: [1, 0, 0],
    position: [1, 0, 0],
    orientation: 0,
  }

  expect(move(instance, options)).toStrictEqual(expectedResult)
})
