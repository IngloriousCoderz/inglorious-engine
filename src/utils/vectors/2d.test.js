import { expect, test } from 'vitest'

import { from2D, is2D, to2D } from './2d'

test('build a 3D vector from a 2D one', () => {
  const vector = [3, 4]
  const expectedResult = [3, 0, 4]

  expect(from2D(vector)).toStrictEqual(expectedResult)
})

test('check if a vector is 2D', () => {
  const vector = [3, 4]
  const expectedResult = true

  expect(is2D(vector)).toBe(expectedResult)
})

test('build a 2D vector from a 3D one', () => {
  const vector = [3, 0, 4]
  const expectedResult = [3, 4]

  expect(to2D(vector)).toStrictEqual(expectedResult)
})
