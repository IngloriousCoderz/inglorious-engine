import { expect, test } from "vitest"

import { ensureV, v } from "./v"

test("ensureV() should convert a numeric array into a vector", () => {
  const array = [1, 2, 3]
  const result = ensureV(array)
  expect(result).toStrictEqual([1, 2, 3])
  expect(result.__isVector__).toBe(true)
})

test("ensureV() should return an existing vector unchanged", () => {
  const vector = v(4, 5, 6)
  const result = ensureV(vector)
  expect(result).toBe(vector)
  expect(result.__isVector__).toBe(true)
})

test("ensureV() should not convert an array with non-finite numbers", () => {
  const array = [1, Infinity, 3]
  const result = ensureV(array)
  expect(result).toBe(array)
  expect(result.__isVector__).toBeUndefined()
})

test("ensureV() should not convert an array with non-numeric values", () => {
  const array = [1, "a", 3]
  const result = ensureV(array)
  expect(result).toBe(array)
  expect(result.__isVector__).toBeUndefined()
})

test("ensureV() should return non-array values unchanged", () => {
  expect(ensureV(123)).toBe(123)
  expect(ensureV("hello")).toBe("hello")
  const obj = { a: 1 }
  expect(ensureV(obj)).toBe(obj)
})

test("a vector created with the v() function is just a number array", () => {
  const vector = v(1, 2, 3)
  expect(vector).toStrictEqual([1, 2, 3])
})

test("a vector created with the v() function has a __isVector__ property", () => {
  const vector = v(1, 2, 3)
  expect(vector.__isVector__).toBe(true)
})
