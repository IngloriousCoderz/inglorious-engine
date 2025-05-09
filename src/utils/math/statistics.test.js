import { expect, test } from "vitest"

import { mean, median, mode } from "./statistics.js"

test("it should return the average of the given numbers", () => {
  const numbers = [1, 3, 2]
  const expectedResult = 2

  expect(mean(...numbers)).toBeCloseTo(expectedResult)
})

test("it should return the median value from an odd list of numbers", () => {
  const numbers = [1, 3, 2]
  const expectedResult = 2

  expect(median(...numbers)).toBe(expectedResult)
})

test("it should return the median value from an even list of numbers", () => {
  const numbers = [1, 3, 2, 4]
  const expectedResult = 2.5

  expect(median(...numbers)).toBe(expectedResult)
})

test("it should find the mode of a list of values", () => {
  const values = [
    "rarely",
    "seldom",
    "seldom",
    "sometimes",
    "sometimes",
    "sometimes",
    "often",
    "often",
    "often",
    "often",
    "always",
    "always",
    "always",
    "always",
    "always",
  ]
  const expectedResult = "always"

  expect(mode(...values)).toBe(expectedResult)
})
