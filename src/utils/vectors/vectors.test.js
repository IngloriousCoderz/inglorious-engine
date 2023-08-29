import { expect, test } from 'vitest'

import * as v from './vectors'

test('it should sum two vectors (aka add)', () => {
  const vector1 = [1, 2, 3]
  const vector2 = [4, 5, 6]
  const expectedResult = [5, 7, 9]

  expect(v.sum(vector1, vector2)).toStrictEqual(expectedResult)
})

test('it should sum multiple vectors (aka add)', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = [12, 15, 18]

  expect(v.sum(...vectors)).toStrictEqual(expectedResult)
})

test('it should subtract two vectors', () => {
  const vector1 = [1, 2, 3]
  const vector2 = [4, 5, 6]
  const expectedResult = [-3, -3, -3]

  expect(v.subtract(vector1, vector2)).toStrictEqual(expectedResult)
})

test('it should subtract multiple vectors', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = [-10, -11, -12]

  expect(v.subtract(...vectors)).toStrictEqual(expectedResult)
})

test('it should compute the dot product between two vectors (aka scalarProduct)', () => {
  const vector1 = [1, 2, 3]
  const vector2 = [4, 5, 6]
  const expectedResult = 32

  expect(v.dotProduct(vector1, vector2)).toStrictEqual(expectedResult)
})

test('it should compute the dot product of multiple vectors (aka scalarProduct)', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = 270

  expect(v.dotProduct(...vectors)).toStrictEqual(expectedResult)
})

test('it should compute the cross product between two vectors (aka vectorProduct)', () => {
  const vector1 = [2, 3, 4]
  const vector2 = [5, 6, 7]
  const expectedResult = [-3, 6, -3]

  expect(v.crossProduct(vector1, vector2)).toStrictEqual(expectedResult)
})
