import { expect, test } from "vitest"

import { clone, filter, find, isObject, map, toString } from "./object.js"

test("it should deep clone an object", () => {
  const obj = {
    primitive: 1,
    array: [2, 3],
    object: { a: 1, b: 2 },
  }
  const expectedResult = {
    primitive: 1,
    array: [2, 3],
    object: { a: 1, b: 2 },
  }

  const result = clone(obj)

  expect(result).toStrictEqual(expectedResult)
  expect(result).not.toBe(expectedResult)
  expect(result.primitive).toBe(expectedResult.primitive)
  expect(result.array).not.toBe(expectedResult.array)
  expect(result.object).not.toBe(expectedResult.object)
})

test("it should behave like Array.prototype.filter, but on an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  }
  const callback = (key) => ["key2", "key3"].includes(key)
  const expectedResult = {
    key2: "value2",
    key3: "value3",
  }

  expect(filter(obj, callback)).toStrictEqual(expectedResult)
})

test("it should behave like Array.prototype.find, but on an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  }
  const callback = (key) => ["key2", "key3"].includes(key)
  const expectedResult = {
    key2: "value2",
  }

  expect(find(obj, callback)).toStrictEqual(expectedResult)
})

test("it correctly should check if a value is an object", () => {
  expect(isObject(1)).toBe(false)
  expect(isObject("a")).toBe(false)
  expect(isObject([])).toBe(false)
  expect(isObject(null)).toBe(false)
  expect(isObject(new Date())).toBe(false)
  expect(isObject({})).toBe(true)
})

test("it should behave like Array.prototype.map, but on an object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  }
  const callback = (key, value) => value.toUpperCase()
  const expectedResult = {
    key1: "VALUE1",
    key2: "VALUE2",
    key3: "VALUE3",
  }

  expect(map(obj, callback)).toStrictEqual(expectedResult)
})

test("it should return a string representation of a shallow object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  }

  expect(toString(obj)).toBe(`{
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
}`)
})

test("it should return a string representation of a nested object", () => {
  const obj = {
    a: 1,
    b: [7, 3],
    c: { d: 4, h: 8 },
    e: [{ f: 5, i: 9 }],
    g: 6,
  }

  expect(toString(obj)).toBe(`{
  a: 1,
  b: [
    7,
    3
  ],
  c: {
    d: 4,
    h: 8
  },
  e: [
    {
      f: 5,
      i: 9
    }
  ],
  g: 6
}`)
})
