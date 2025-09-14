import { expect, test } from "vitest"

import { isFunction } from "./function.js"

test("it should correctly identify a function", () => {
  const func = () => {}

  expect(isFunction(func)).toBe(true)
})

test("it should correctly identify a non-function", () => {
  const str = "hello"

  expect(isFunction(str)).toBe(false)
})
