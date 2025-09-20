import { expect, test } from "vitest"

import { v } from "../linear-algebra/vector.js"
import { intersectsRectangle } from "./rectangle.js"

test("it should prove that a rectangle crossing another one intersects with it", () => {
  const rectangle1 = {
    position: v(0, 0, 0),
    size: v(2, 2, 2),
  }
  const rectangle2 = {
    position: v(1, 1, 1),
    size: v(2, 2, 2),
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(true)
})

test("it should prove that a rectangle right on top of another intersects with it", () => {
  const rectangle1 = {
    position: v(0, 0, 0),
    size: v(2, 2, 2),
  }
  const rectangle2 = {
    position: v(0, 0, 0),
    size: v(2, 0, 2),
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(true)
})

test("it should prove that a rectangle not crossing another one does not intersect with it", () => {
  const rectangle1 = {
    position: v(0, 0, 0),
    size: v(2, 2, 2),
  }
  const rectangle2 = {
    position: v(3, 3, 3),
    size: v(2, 2, 2),
  }

  expect(intersectsRectangle(rectangle1, rectangle2)).toBe(false)
})
