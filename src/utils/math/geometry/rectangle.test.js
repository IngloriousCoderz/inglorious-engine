import { expect, test } from "vitest"

import { intersectsPlatform } from "./rectangle.js"

test("it should prove that a rectangle crossing a platform from above intersects with it", () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }
  const platform = {
    position: [0, -1, 0],
    size: [2, 2, 0],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(true)
})

test("it should prove that a rectangle right on top of a platform intersects with it", () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }
  const platform = {
    position: [0, -2, 0],
    size: [2, 2, 0],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(true)
})

test("it should prove that a rectangle crossing a platform from below does not intersect with it", () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }
  const platform = {
    position: [0, 1, 0],
    size: [2, 2, 0],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})

test("it should prove that a rectangle below a platform does not intersect with it", () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }
  const platform = {
    position: [0, -3, 0],
    size: [2, 2, 0],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})

test("it should prove that a rectangle not crossing a platform horizontally does not intersect with it", () => {
  const rectangle = {
    position: [0, 0, 0],
    size: [2, 2, 0],
  }
  const platform = {
    position: [-3, 0, 0],
    size: [2, 2, 0],
  }

  expect(intersectsPlatform(rectangle, platform)).toBe(false)
})
