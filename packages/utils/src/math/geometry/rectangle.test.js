import { expect, test } from "vitest"

import { intersectsRectangle } from "./rectangle.js"

test("it should prove that a rectangle crossing another one intersects with it", () => {
  const rectangle1 = {
    position: [0, 0, 0],
    size: [2, 2, 2],
  }
  const rectangle2 = {
    position: [1, 1, 1],
    size: [2, 2, 2],
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(true)
})

test("it should prove that a rectangle right on top of another intersects with it", () => {
  const rectangle1 = {
    position: [0, 0, 0],
    size: [2, 2, 2],
  }
  const rectangle2 = {
    position: [0, 0, 0],
    size: [2, 0, 2],
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(true)
})

test("it should prove that a rectangle not crossing another one does not intersect with it", () => {
  const rectangle1 = {
    position: [0, 0, 0],
    size: [2, 2, 2],
  }
  const rectangle2 = {
    position: [3, 3, 3],
    size: [2, 2, 2],
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(false)
})
