import { expect, test } from "vitest"

import { v } from "../linear-algebra/vector.js"
import { distanceFromPoint, intersectsCircle } from "./line.js"

test("it should compute the distance between a line and a point", () => {
  const line = v(-4, 3, 0)
  const point = v(5, 0, 0)
  const expectedResult = 4

  expect(distanceFromPoint(line, point)).toBe(expectedResult)
})

test("it should not compute the distance between a line and a point", () => {
  const line = v(-1, 1, 0)
  const point = v(2, 0, 2)
  const expectedResult = 0

  expect(distanceFromPoint(line, point)).toBe(expectedResult)
})

test("it should prove that a line that crosses a circle intersects with it", () => {
  const line = v(-2, 2, 0)
  const circle = {
    position: v(1, 1, 0),
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test("it should prove that a line tangent to a circle intersects with it", () => {
  const line = v(-2, 0, 0)
  const circle = {
    position: v(1, 0, 1),
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test("it should prove that a line that does not cross a circle does not intersect with it", () => {
  const line = v(1, 1, 0)
  const circle = {
    position: v(1, 0, 1),
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(false)
})
