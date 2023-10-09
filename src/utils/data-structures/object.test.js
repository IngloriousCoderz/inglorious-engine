import { expect, test } from 'vitest'

import { filter, find, map, toString } from './object'

test('it should behave like Array.prototype.filter, but on an object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  }
  const callback = (key) => ['key2', 'key3'].includes(key)
  const expectedResult = {
    key2: 'value2',
    key3: 'value3',
  }

  expect(filter(obj, callback)).toStrictEqual(expectedResult)
})

test('it should behave like Array.prototype.find, but on an object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  }
  const callback = (key) => ['key2', 'key3'].includes(key)
  const expectedResult = {
    key2: 'value2',
  }

  expect(find(obj, callback)).toStrictEqual(expectedResult)
})

test('it should behave like Array.prototype.map, but on an object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  }
  const callback = (key, value) => value.toUpperCase()
  const expectedResult = {
    key1: 'VALUE1',
    key2: 'VALUE2',
    key3: 'VALUE3',
  }

  expect(map(obj, callback)).toStrictEqual(expectedResult)
})

test('it should return a string representation of a shallow object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  }

  expect(toString(obj)).toBe(`{
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
}`)
})

test('it should return a string representation of a nested object', () => {
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
