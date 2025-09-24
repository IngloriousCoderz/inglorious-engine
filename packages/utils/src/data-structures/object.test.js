import { expect, test } from "vitest"

import { v } from "../v.js"
import {
  clone,
  deserialize,
  filter,
  find,
  isObject,
  map,
  produce,
  serialize,
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

  const originalBaseState = deserialize(serialize(baseState))

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

test("it should serialize a basic object with primitive values", () => {
  const obj = { a: 1, b: "hello", c: true }
  const expected = `{"a":1,"b":"hello","c":true}`

  expect(serialize(obj)).toBe(expected)
})

test("it should serialize an object with nested objects", () => {
  const obj = { a: 1, b: { c: "nested", d: { e: false } } }
  const expected = `{"a":1,"b":{"c":"nested","d":{"e":false}}}`

  expect(serialize(obj)).toBe(expected)
})

test("it should serialize an object containing a vector-like object", () => {
  const obj = { position: v(1, 2, 3) }
  const expected = `{"position":{"_type":"vector","coords":[1,2,3]}}`

  expect(serialize(obj)).toBe(expected)
})

test("it should serialize an object with nested vector-like objects", () => {
  const obj = {
    entity: {
      id: "player",
      pos: v(10, 20),
      vel: v(1, 0),
      stats: { health: 100 },
    },
  }
  const expected = `{"entity":{"id":"player","pos":{"_type":"vector","coords":[10,20]},"vel":{"_type":"vector","coords":[1,0]},"stats":{"health":100}}}`

  expect(serialize(obj)).toBe(expected)
})

test("it should serialize an empty object", () => {
  const obj = {}
  const expected = `{}`

  expect(serialize(obj)).toBe(expected)
})

test("it should serialize an object with null and undefined values (undefined should be omitted)", () => {
  const obj = { a: null, b: undefined, c: 1 }
  const expected = `{"a":null,"c":1}` // JSON.stringify omits undefined properties

  expect(serialize(obj)).toBe(expected)
})

test("it should deserialize a basic object with primitive values", () => {
  const serialized = `{"a":1,"b":"hello","c":true}`
  const expected = { a: 1, b: "hello", c: true }

  expect(deserialize(serialized)).toStrictEqual(expected)
})

test("it should deserialize an object with nested objects", () => {
  const serialized = `{"a":1,"b":{"c":"nested","d":{"e":false}}}`
  const expected = { a: 1, b: { c: "nested", d: { e: false } } }

  expect(deserialize(serialized)).toStrictEqual(expected)
})

test("it should deserialize an object containing a vector representation", () => {
  const serialized = `{"position":{"_type":"vector","coords":[1,2,3]}}`
  const expected = { position: v(1, 2, 3) }

  const result = deserialize(serialized)

  expect(result).toStrictEqual(expected)
  expect(result.position.__isVector__).toBe(true)
})

test("it should deserialize an object with nested vector representations", () => {
  const serialized = `{"entity":{"id":"player","pos":{"_type":"vector","coords":[10,20]},"vel":{"_type":"vector","coords":[1,0]},"stats":{"health":100}}}`
  const expected = {
    entity: {
      id: "player",
      pos: v(10, 20),
      vel: v(1, 0),
      stats: { health: 100 },
    },
  }
  const result = deserialize(serialized)

  expect(result).toStrictEqual(expected)
  expect(result.entity.pos.__isVector__).toBe(true)
  expect(result.entity.vel.__isVector__).toBe(true)
})

test("it should deserialize an empty object", () => {
  const serialized = `{}`
  const expected = {}

  expect(deserialize(serialized)).toStrictEqual(expected)
})

test("it should correctly round-trip a complex object through serialize and deserialize", () => {
  const original = {
    id: "game1",
    player: { name: "Alice", score: 100, position: v(10, 20) },
    enemies: [{ type: "goblin", pos: v(5, 5) }],
    settings: { volume: 0.8, mute: false },
  }
  const jsonString = serialize(original)
  const deserialized = deserialize(jsonString)

  expect(deserialized).toStrictEqual(original)
  expect(deserialized.player.position.__isVector__).toBe(true)
  expect(deserialized.enemies[0].pos.__isVector__).toBe(true)
  // Ensure that non-vector objects are still distinct references if they were originally
  expect(deserialized.player).not.toBe(original.player)
})
