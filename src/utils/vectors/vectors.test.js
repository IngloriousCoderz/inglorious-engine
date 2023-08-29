import { expect, test } from 'vitest'

import * as v from '.'

test('it should conjugate a vector', () => {
  const vector = [1, 2, 3]
  const expectedResult = [1, -2, -3]

  expect(v.conjugate(vector)).toStrictEqual(expectedResult)
})

test('it should rotate a vector by a certain angle', () => {
  const vector = [1, 0, 1]
  const angle = 0.7853981633974483 // pi/4
  const expectedResult = [8.659560562354934e-17, 0, 1.4142135623730951] // close to [0, 0, sqrt(2)]

  expect(v.rotate(vector, angle)).toStrictEqual(expectedResult)
})

test('it should rotate a vector that faces left by a certain angle', () => {
  const vector = [-1, 0, 0]
  const angle = 0.7853981633974483 // pi/4
  const expectedResult = [-0.7071067811865477, 0, -0.7071067811865475] // close to [-sqrt(2), 0, -sqrt(2)]

  expect(v.rotate(vector, angle)).toStrictEqual(expectedResult)
})

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

test('it should change magnitude of a vector (aka setLength)', () => {
  const vector = [3, 4]
  const magnitude = 10
  const expectedResult = [6, 8]

  expect(v.setMagnitude(vector, magnitude)).toStrictEqual(expectedResult)
})

test('it should compute the angle of a 2D vector', () => {
  const vector = [1, 1]
  const expectedResult = 0.7853981633974483

  expect(v.angle(vector)).toBe(expectedResult)
})

test('it should compute the angle of a 3D vector', () => {
  const vector = [1, 0, 1]
  const expectedResult = 0.7853981633974483

  expect(v.angle(vector)).toBe(expectedResult)
})

test('it should create a 3D unit vector from an angle', () => {
  const angle = 0.7853981633974483
  const expectedResult = [0.7071067811865476, 0, 0.7071067811865475]

  expect(v.fromAngle(angle)).toStrictEqual(expectedResult)
})

test('it should clamp the magnitude of a vector to a certain length if too long', () => {
  const vector = [6, 8]
  const min = 0
  const max = 5
  const expectedResult = [3, 4]

  expect(v.clamp(vector, min, max)).toStrictEqual(expectedResult)
})

test('it should not clamp the magnitude of a vector to a certain length if not too long', () => {
  const vector = [3, 4]
  const min = 0
  const max = 6
  const expectedResult = [3, 4]

  expect(v.clamp(vector, min, max)).toStrictEqual(expectedResult)
})

test('it should clamp the magnitude of a vector to the values of other vector bounds', () => {
  const vector = [6, 8]
  const lowerBound = [0, 0]
  const upperBound = [3, 4]
  const expectedResult = [3, 4]

  expect(v.clamp(vector, lowerBound, upperBound)).toStrictEqual(expectedResult)
})

test('it should multiply a vector with a scalar (aka times)', () => {
  const vector = [1, 2, 3]
  const scalar = 4
  const expectedResult = [4, 8, 12]

  expect(v.multiply(vector, scalar)).toStrictEqual(expectedResult)
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

test('it should divide a vector by a scalar', () => {
  const vector = [4, 8, 12]
  const scalar = 4
  const expectedResult = [1, 2, 3]

  expect(v.divide(vector, scalar)).toStrictEqual(expectedResult)
})

test('it should apply the mod operator (aka remainder) on a vector', () => {
  const vector = [10, 12, 18]
  const divisor = 12
  const expectedResult = [10, 0, 6]

  expect(v.mod(vector, divisor)).toStrictEqual(expectedResult)
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
