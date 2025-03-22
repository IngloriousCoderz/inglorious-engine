import { expect, test } from "vitest"

import { distanceFromPoint, intersectsCircle } from "./line.js"

test("it should compute the distance between a line and a point", () => {
  const line = [-4, 3, 0]
  const point = [5, 0, 0]
  const expectedResult = 4

  expect(distanceFromPoint(line, point)).toBe(expectedResult)
})

test("it should not compute the distance between a line and a point", () => {
  const line = [-1, 1, 0]
  const point = [2, 0, 2]
  const expectedResult = 0

  expect(distanceFromPoint(line, point)).toBe(expectedResult)
})

test("it should prove that a line that crosses a circle intersects with it", () => {
  const line = [-2, 2, 0]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test("it should prove that a line tangent to a circle intersects with it", () => {
  const line = [-2, 0, 0]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(true)
})

test("it should prove that a line that does not cross a circle does not intersect with it", () => {
  const line = [1, 1, 0]
  const circle = {
    position: [1, 0, 1],
    radius: 1,
  }

  expect(intersectsCircle(line, circle)).toBe(false)
})
