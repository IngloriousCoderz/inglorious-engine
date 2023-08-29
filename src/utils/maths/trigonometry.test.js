import { expect, test } from 'vitest'

import * as t from './trigonometry'

test('it should convert radians to degrees', () => {
  const radians = 0.7853981633974483
  const expectedResult = 45

  expect(t.toDegrees(radians)).toBe(expectedResult)
})

test('it should convert radians to degrees', () => {
  const degrees = 45
  const expectedResult = 0.7853981633974483

  expect(t.toRadians(degrees)).toBe(expectedResult)
})
