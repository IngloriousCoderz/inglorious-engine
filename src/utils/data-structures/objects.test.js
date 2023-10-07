import { expect, test } from 'vitest'

import { merge } from './objects'

test('it should deep merge two objects', () => {
  const obj1 = {
    a: 1,
    b: [2, 3],
    c: { d: 4 },
    e: [{ f: 5 }],
  }
  const obj2 = {
    g: 6,
    b: [7],
    c: { h: 8 },
    e: [{ i: 9 }],
  }
  const expectedResult = {
    a: 1,
    b: [7, 3],
    c: { d: 4, h: 8 },
    e: [{ f: 5, i: 9 }],
    g: 6,
  }

  expect(merge(obj1, obj2)).toStrictEqual(expectedResult)
})
