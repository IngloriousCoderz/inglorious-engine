import { expect, test } from 'vitest'

import { applyGravity } from './gravity'

test('it should compute no gravity when max jump height is not set', () => {
  const params = {
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    py: 10,
  }
  const dt = 1

  expect(applyGravity(params, { dt })).toStrictEqual({ ay: -0, vy: 10, py: 20 })
})

test('it should throw an error when max leap distance is not set', () => {
  const params = {
    maxJump: 10,
    maxSpeed: 10,
    vy: 10,
    py: 10,
  }
  const dt = 1

  expect(() => applyGravity(params, { dt })).toThrow()
})

test('it should compute no gravity when max movement speed is not set', () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    vy: 10,
    py: 10,
  }
  const dt = 1

  expect(applyGravity(params, { dt })).toStrictEqual({ ay: -0, vy: 10, py: 20 })
})

test('it should apply no gravity when no time has passed (gravity is calculated but not applied)', () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    py: 10,
  }

  expect(applyGravity(params)).toStrictEqual({ ay: -20, vy: 10, py: 10 })
})

test('it should apply gravity based on input parameters', () => {
  const params = {
    maxJump: 10,
    maxLeap: 10,
    maxSpeed: 10,
    vy: 10,
    py: 10,
  }
  const dt = 1

  expect(applyGravity(params, { dt })).toStrictEqual({
    ay: -20,
    vy: -10,
    py: -10,
  })
})
