import { expect, test } from 'vitest'

import { intersectsPlatform } from './rectangle'

test('it should prove that a rectangle above a platform intersects with it', () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2],
  }
  const platform = {
    position: [0, 0, -1],
    size: [2, 1],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(true)
})

test('it should prove that a rectangle crossing a platform does not intersect with it', () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2],
  }
  const platform = {
    position: [-1, 0, -1],
    size: [2, 2],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})

test('it should prove that a rectangle below a platform does not intersect with it', () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2],
  }
  const platform = {
    position: [0, 0, 2],
    size: [2, 1],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})

test('it should prove that a rectangle not crossing a platform horizontally does not intersect with it', () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2],
  }
  const platform = {
    position: [-3, 0, -1],
    size: [2, 1],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})
