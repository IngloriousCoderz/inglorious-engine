import { expect, test } from "vitest"

import { v } from "./v"

test("a vector created with the v() function is just a number array", () => {
  const vector = v(1, 2, 3)
  expect(vector).toStrictEqual([1, 2, 3])
})

test("a vector created with the v() function has a __isVector__ property", () => {
  const vector = v(1, 2, 3)
  expect(vector.__isVector__).toBe(true)
})
