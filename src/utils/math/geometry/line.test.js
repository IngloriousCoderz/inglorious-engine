import { expect, test } from 'vitest'

import { intersectsCircle } from './line.js'

test('it should prove that a line that crosses a circle intersects with it', () => {
  const line = { from: [0, 0, 0], to: [2, 0, 2] }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test('it should prove that a line tangent to a circle intersects with it', () => {
  const line = { from: [0, 0, 0], to: [0, 0, 2] }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test('it should prove that a line inside of a circle intersects with it', () => {
  const line = { from: [0.5, 0, 0.5], to: [1.5, 0, 1.5] }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test('it should prove that a line that does not cross a circle does not intersect with it', () => {
  const line = { from: [0, 0, 0], to: [-2, 0, 2] }
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(false)
})
