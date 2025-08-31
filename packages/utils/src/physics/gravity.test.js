import { expect, test } from "vitest"

import { applyGravity } from "./gravity.js"

test("it should apply gravity based on input parameters", () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    position: [0, 10, 0],
  }

  expect(applyGravity(params)).toStrictEqual({
    ay: -20,
    vy: -10,
    position: [0, -10, 0],
  })
})

test("it should compute no gravity when max jump height is not set", () => {
  const params = {
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    position: [0, 10, 0],
  }

  expect(applyGravity(params)).toStrictEqual({
    ay: -0,
    vy: 10,
    position: [0, 20, 0],
  })
})

test("it should compute no gravity when max movement speed is not set", () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    vy: 10,
    position: [0, 10, 0],
  }

  expect(applyGravity(params)).toStrictEqual({
    ay: -0,
    vy: 10,
    position: [0, 20, 0],
  })
})

test("it should apply no gravity when no time has passed", () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    position: [0, 10, 0],
  }
  const dt = 0

  expect(applyGravity(params, dt)).toStrictEqual({
    ay: -20,
    vy: 10,
    position: [0, 10, 0],
  })
})

test("it should throw an error when max leap distance is not set", () => {
  const params = {
    maxJump: 10,
    maxSpeed: 10,
    vy: 10,
    position: [0, 10, 0],
  }

  expect(() => applyGravity(params)).toThrow()
})
