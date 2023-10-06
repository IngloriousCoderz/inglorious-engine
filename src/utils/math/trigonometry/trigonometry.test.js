import { expect, test } from 'vitest'

import { pi, toDegrees, toRadians, toRange } from '.'

test('it should convert radians to degrees', () => {
  const radians = pi() / 4
  const expectedResult = 45

  expect(toDegrees(radians)).toBeCloseTo(expectedResult)
})

test('it should convert radians to degrees', () => {
  const degrees = 45
  const expectedResult = pi() / 4

  expect(toRadians(degrees)).toBeCloseTo(expectedResult)
})

test('it should convert an angle greater than pi to a range between -pi and pi', () => {
  const angle = (5 / 4) * pi()
  const expectedResult = (-3 / 4) * pi()

  expect(toRange(angle)).toBeCloseTo(expectedResult)
})

test('it should convert an angle greater than 2pi to a range between -pi and pi', () => {
  const angle = (13 / 4) * pi()
  const expectedResult = (-3 / 4) * pi()

  expect(toRange(angle)).toBeCloseTo(expectedResult)
})

test('it should convert an angle less than pi to a range between -pi and pi', () => {
  const angle = (-5 / 4) * pi()
  const expectedResult = (3 / 4) * pi()

  expect(toRange(angle)).toBeCloseTo(expectedResult)
})

test('it should convert an angle less than 2pi to a range between -pi and pi', () => {
  const angle = (-13 / 4) * pi()
  const expectedResult = (3 / 4) * pi()

  expect(toRange(angle)).toBeCloseTo(expectedResult)
})

test('it should not convert an angle already in the range [-pi, pi]', () => {
  const angle = (3 / 4) * pi()
  const expectedResult = (3 / 4) * pi()

  expect(toRange(angle)).toBe(expectedResult)
})
