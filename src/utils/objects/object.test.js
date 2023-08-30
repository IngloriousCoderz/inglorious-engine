import { expect, test } from 'vitest'

import * as o from '.'

test('it should behave like Array.prototype.map, but on an object', () => {
  const obj = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3',
  }
  const callback = (_, value) => value.toUpperCase()
  const expectedResult = {
    key1: 'VALUE1',
    key2: 'VALUE2',
    key3: 'VALUE3',
  }

  expect(o.map(obj, callback)).toStrictEqual(expectedResult)
})
