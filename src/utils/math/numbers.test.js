import { expect, test } from 'vitest'

import { abs, clamp, mod, sign } from './numbers'

test('it should return the absolute value of a number', () => {
  const num = -7
  const expectedResult = 7

  expect(abs(num)).toBe(expectedResult)
})

test('it should clamp a number too big', () => {
  const num = 7
  const min = 0
  const max = 6
  const expectedResult = 6

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should clamp a number too small', () => {
  const num = 2
  const min = 3
  const max = 6
  const expectedResult = 3

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should not clamp a number in the range', () => {
  const num = 4
  const min = 2
  const max = 6
  const expectedResult = 4

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should compute the modulo operator on negative numbers', () => {
  const num = -2
  const divisor = 12
  const expectedResult = 10

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a number greater than 1 to a range between -1 and 1', () => {
  const num = 5 / 4
  const divisor = 1
  const expectedResult = 1 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a number greater than 2 to a range between -1 and 1', () => {
  const num = 13 / 4
  const divisor = 1
  const expectedResult = 1 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a number less than -1 to a range between -1 and 1', () => {
  const num = -5 / 4
  const divisor = 1
  const expectedResult = 3 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should calculate the sign of a number', () => {
  const num = -3
  const expectedResult = -1

  expect(sign(num)).toBe(expectedResult)
})

test('it should return the number itself if the sign is zero', () => {
  const num = 0
  const expectedResult = 0

  expect(sign(num)).toBe(expectedResult)
})
