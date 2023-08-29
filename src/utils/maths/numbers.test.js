import { expect, test } from 'vitest'

import * as n from './numbers'

test('it should clamp a number too big', () => {
  const num = 7
  const min = 0
  const max = 6
  const expectedResult = 6

  expect(n.clamp(num, min, max)).toBe(expectedResult)
})

test('it should clamp a number too small', () => {
  const num = 2
  const min = 3
  const max = 6
  const expectedResult = 3

  expect(n.clamp(num, min, max)).toBe(expectedResult)
})

test('it should not clamp a number in the range', () => {
  const num = 4
  const min = 2
  const max = 6
  const expectedResult = 4

  expect(n.clamp(num, min, max)).toBe(expectedResult)
})
