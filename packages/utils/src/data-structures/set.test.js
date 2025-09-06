import { expect, test } from "vitest"

import { ensureSet } from "./set.js"

test("it should return the same array if the value is already an array", () => {
  const set = new Set([1, "two", { three: 3 }])

  expect(ensureSet(set)).toBe(set)
})

test("it should wrap the value in an array if it is not an array", () => {
  const str = "hello"

  expect(ensureSet(str)).toStrictEqual(new Set(["h", "e", "l", "o"]))
})
