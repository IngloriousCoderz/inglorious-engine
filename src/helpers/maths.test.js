import { expect, test } from 'vitest'

import * as m from './maths'

test('it should sum two numbers together', () => {
  const num1 = 2
  const num2 = 3
  const expectedResult = 5

  expect(m.sum(num1, num2)).toBe(expectedResult)
})

test('it should compute the hypothenuse of two catheti (aka pythagoras)', () => {
  const cat1 = 3
  const cat2 = 4
  const expectedResult = 5

  expect(m.hypothenuse(cat1, cat2)).toBe(expectedResult)
})

test('it should convert an angle from degrees to radians', () => {
  const angle = 45
  const expectedResult = 0.7853981633974483

  expect(m.toRadians(angle)).toBe(expectedResult)
})
