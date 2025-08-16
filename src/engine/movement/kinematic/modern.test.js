import { expect, test } from "vitest"

import modernMove from "./modern.js"

test("it should move following its velocity", () => {
  const instance = { maxSpeed: 1, velocity: [1, 0, 0], position: [0, 0, 0] }
  const dt = 1
  const expectedResult = {
    velocity: [1, 0, 0],
    position: [1, 0, 0],
    orientation: 0,
  }

  expect(modernMove(instance, dt)).toStrictEqual(expectedResult)
})

test("it should limit the velocity to the max speed", () => {
  const instance = { maxSpeed: 1, velocity: [10, 0, 0], position: [0, 0, 0] }
  const dt = 1
  const expectedResult = {
    velocity: [1, 0, 0],
    position: [1, 0, 0],
    orientation: 0,
  }

  expect(modernMove(instance, dt)).toStrictEqual(expectedResult)
})
