import { expect, test } from 'vitest'

import { abs, clamp, mod, sign } from '.'

test('it should return the same number if already positive', () => {
  const num = 42
  const expectedResult = 42

  expect(abs(num)).toBe(expectedResult)
})

test('it should return the absolute value of a number', () => {
  const num = -42
  const expectedResult = 42

  expect(abs(num)).toBe(expectedResult)
})

test('it should not clamp a number in the range', () => {
  const num = 42
  const min = 0
  const max = 100
  const expectedResult = 42

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should clamp a number too small', () => {
  const num = -42
  const min = 0
  const max = 100
  const expectedResult = 0

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should clamp a number too big', () => {
  const num = 142
  const min = 0
  const max = 100
  const expectedResult = 100

  expect(clamp(num, min, max)).toBe(expectedResult)
})

test('it should return zero if dividend equals divisor', () => {
  const num = 2
  const divisor = 2
  const expectedResult = 0

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should return one if number is odd', () => {
  const num = 3
  const divisor = 2
  const expectedResult = 1

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should return one if negative number turns to positive one', () => {
  const num = -3
  const divisor = 2
  const expectedResult = 1

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a float number greater than 1 to a range between -1 and 1', () => {
  const num = 5 / 4
  const divisor = 1
  const expectedResult = 1 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a float number greater than 2 to a range between -1 and 1', () => {
  const num = 13 / 4
  const divisor = 1
  const expectedResult = 1 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should convert a negative float number to a range between -1 and 1', () => {
  const num = -5 / 4
  const divisor = 1
  const expectedResult = 3 / 4

  expect(mod(num, divisor)).toBe(expectedResult)
})

test('it should return one if number is positive', () => {
  const num = 42
  const expectedResult = 1

  expect(sign(num)).toBe(expectedResult)
})

test('it should return minus one if number is negative', () => {
  const num = -42
  const expectedResult = -1

  expect(sign(num)).toBe(expectedResult)
})

test('it should return the number itself if the sign is zero', () => {
  const num = 0
  const expectedResult = 0

  expect(sign(num)).toBe(expectedResult)
})
