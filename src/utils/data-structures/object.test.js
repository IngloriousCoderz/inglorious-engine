import { expect, test } from "vitest"

import {
  clone,
  filter,
  find,
  isObject,
  map,
  produce,
  toString,
} from "./object.js"

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

test("it should produce a new state without mutating the original", () => {
  const baseState = {
    a: 1,
    b: {
      c: [2, 3],
      d: { e: 4 },
    },
    f: 5,
  }

  const recipe = (draft) => {
    draft.a = 10
    draft.b.c.push(4)
    draft.b.d.e = 40
    draft.g = 6
  }

  const expectedState = {
    a: 10,
    b: {
      c: [2, 3, 4],
      d: { e: 40 },
    },
    f: 5,
    g: 6,
  }

  const originalBaseState = JSON.parse(JSON.stringify(baseState))

  const nextState = produce(baseState, recipe)

  expect(nextState).toStrictEqual(expectedState)
  expect(nextState).not.toBe(baseState)
  expect(baseState).toStrictEqual(originalBaseState)
})

test("it should support currying to produce a new state", () => {
  const baseState = {
    a: 1,
    b: {
      c: [2, 3],
      d: { e: 4 },
    },
    f: 5,
  }
  const originalStateCopy = clone(baseState)

  const recipe = (draft) => {
    draft.a = 10
    draft.b.c.push(4)
    draft.g = 6
  }

  const expectedState = {
    a: 10,
    b: {
      c: [2, 3, 4],
      d: { e: 4 },
    },
    f: 5,
    g: 6,
  }

  const producer = produce(recipe)
  const nextState = producer(baseState)

  expect(nextState).toStrictEqual(expectedState)
  expect(nextState).not.toBe(baseState)
  expect(baseState).toStrictEqual(originalStateCopy)
})

test("it should pass extra arguments to the recipe", () => {
  const baseState = { value: 1 }
  const recipe = (draft, increment, multiplier) => {
    draft.value = (draft.value + increment) * multiplier
  }

  // Test non-curried version
  const nextStateUncurried = produce(baseState, recipe, 2, 3) // (1 + 2) * 3 = 9
  expect(nextStateUncurried.value).toBe(9)

  // Test curried version
  const producer = produce(recipe)
  const nextStateCurried = producer(baseState, 4, 5) // (1 + 4) * 5 = 25
  expect(nextStateCurried.value).toBe(25)

  expect(baseState.value).toBe(1)
})

test("it should return a string representation of a shallow object", () => {
  const obj = {
    key1: "value1",
    key2: "value2",
    key3: "value3",
  }

  expect(toString(obj)).toBe(`{
  key1: "value1",
  key2: "value2",
  key3: "value3"
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
