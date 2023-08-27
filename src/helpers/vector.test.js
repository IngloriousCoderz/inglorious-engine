import { expect, test } from 'vitest'

import * as v from './vector'

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

test('it should compute the magnitude of a vector (synonim of length)', () => {
  const vector = [3, 4]
  const expectedResult = 5

  expect(v.magnitude(vector)).toBe(expectedResult)
})

test('it should multiply a vector with a scalar (aka times)', () => {
  const scalar = 4
  const vector = [1, 2, 3]
  const expectedResult = [4, 8, 12]

  expect(v.multiply(scalar, vector)).toStrictEqual(expectedResult)
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

test('it should shift a vector at a certain index', () => {
  const vector = [1, 2, 3, 4, 5]
  const index = 2
  const expectedResult = [3, 4, 5, 1, 2]

  expect(v.shift(vector, index)).toStrictEqual(expectedResult)
})

test('it should convert a 2D polar vector to cartesian coordinates', () => {
  const vector = [1.4142135623730951, 0.7853981633974483]
  const expectedResult = [1.0000000000000002, 1]

  expect(v.toCartesian(vector)).toStrictEqual(expectedResult)
})

test('it should convert a 2D cartesian vector to polar coordinates', () => {
  const vector = [1, 1]
  const expectedResult = [1.4142135623730951, 0.7853981633974483]

  expect(v.toPolar(vector)).toStrictEqual(expectedResult)
})

test('it should convert a 3D cartesian vector to cylindrical coordinates', () => {
  const vector = [1, 1, 1]
  const expectedResult = [1.2247448713915892, 1.224744871391589, 1]

  expect(v.toCylindrical(vector)).toStrictEqual(expectedResult)
})

test('it should normalize a vector so it has unit length', () => {
  const vector = [3, 4]
  const expectedResult = 1

  expect(v.length(v.normalize(vector))).toBe(expectedResult)
})
