import { expect, test } from 'vitest'

import * as n from './numbers'

test('it should return the absolute value of a number', () => {
  const num = -7
  const expectedResult = 7

  expect(n.abs(num)).toBe(expectedResult)
})

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

test('it should compute the modulo operator on negative numbers', () => {
  const num = -2
  const divisor = 12
  const expectedResult = 10

  expect(n.mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a number greater than 1 to a range between -1 and 1', () => {
  const num = 5 / 4
  const divisor = -1
  const expectedResult = -3 / 4

  expect(n.mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a number less than -1 to a range between -1 and 1', () => {
  const num = -5 / 4
  const divisor = 1
  const expectedResult = 3 / 4

  expect(n.mod(num, divisor)).toBe(expectedResult)
})
