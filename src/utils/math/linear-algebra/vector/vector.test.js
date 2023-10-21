import { cos, pi, sin } from '@inglorious/utils/math/trigonometry'
import { expect, test } from 'vitest'

import {
  abs,
  angle,
  clamp,
  conjugate,
  createVector,
  divide,
  fromAngle,
  magnitude,
  mod,
  multiply,
  normalize,
  rotate,
  setAngle,
  setMagnitude,
  shift,
  toCartesian,
  toCylindrical,
  toPolar,
  toString,
  unit,
} from '.'

test("it should compute the absolute value of a vector's coordinates", () => {
  const vector = [-2, 0, 3]
  const expectedResult = [2, 0, 3]

  expect(abs(vector)).toStrictEqual(expectedResult)
})

test('it should compute the angle of a 2D vector', () => {
  const vector = [1, 1]
  const expectedResult = pi() / 4

  expect(angle(vector)).toBe(expectedResult)
})

test('it should compute the angle of a 3D vector', () => {
  const vector = [1, 0, 1]
  const expectedResult = pi() / 4

  expect(angle(vector)).toBe(expectedResult)
})

test('it should clamp the magnitude of a vector to a certain length if too long', () => {
  const vector = [6, 8]
  const min = 0
  const max = 5
  const expectedResult = [3, 4]

  expect(clamp(vector, min, max)).toStrictEqual(expectedResult)
})

test('it should not clamp the magnitude of a vector to a certain length if not too long', () => {
  const vector = [3, 4]
  const min = 0
  const max = 6
  const expectedResult = [3, 4]

  expect(clamp(vector, min, max)).toStrictEqual(expectedResult)
})

test('it should clamp the magnitude of a vector to the values of other vector bounds', () => {
  const vector = [6, 8]
  const lowerBound = [0, 0]
  const upperBound = [3, 4]
  const expectedResult = [3, 4]

  expect(clamp(vector, lowerBound, upperBound)).toStrictEqual(expectedResult)
})

test('it should conjugate a vector', () => {
  const vector = [1, 2, 3]
  const expectedResult = [1, -2, -3]

  expect(conjugate(vector)).toStrictEqual(expectedResult)
})

test('it should create a 3D vector given its magnitude and angle', () => {
  const magnitude = 2 ** 0.5
  const angle = pi() / 4
  const expectedResult = [1, -0, 1.0000000000000002] // close to [1, 0, 1]

  expect(createVector(magnitude, angle)).toStrictEqual(expectedResult)
})

test('it should divide a vector by a scalar', () => {
  const vector = [4, 8, 12]
  const scalar = 4
  const expectedResult = [1, 2, 3]

  expect(divide(vector, scalar)).toStrictEqual(expectedResult)
})

test('it should create a 3D unit vector from an angle', () => {
  const angle = pi() / 4
  const expectedResult = [0.7071067811865475, -0, 0.7071067811865476] // close to [cos(angle), 0, sin(angle)]

  expect(fromAngle(angle)).toStrictEqual(expectedResult)
})

test('it should compute the magnitude of a vector (aka length)', () => {
  const vector = [3, 4]
  const expectedResult = 5

  expect(magnitude(vector)).toBe(expectedResult)
})

test('it should apply the mod operator (aka remainder) on a vector', () => {
  const vector = [10, 12, -18]
  const divisor = 12
  const expectedResult = [10, 0, 6]

  expect(mod(vector, divisor)).toStrictEqual(expectedResult)
})

test('it should multiply a vector with a scalar (aka times)', () => {
  const vector = [1, 2, 3]
  const scalar = 4
  const expectedResult = [4, 8, 12]

  expect(multiply(vector, scalar)).toStrictEqual(expectedResult)
})

test('it should normalize a vector so it has unit length', () => {
  const vector = [3, 4]
  const expectedResult = [0.6, 0.8]

  expect(normalize(vector)).toStrictEqual(expectedResult)
})

test('it should normalize a negative vector', () => {
  const vector = [-3, -4]
  const expectedResult = [-0.6, -0.8]

  expect(normalize(vector)).toStrictEqual(expectedResult)
})

test('it should rotate a 2D vector by a certain angle', () => {
  const vector = [1, 0]
  const angle = pi() / 4
  const expectedResult = [0.7071067811865475, 0.7071067811865476] // close to [cos(pi/4), sin(pi/4)]

  expect(rotate(vector, angle)).toStrictEqual(expectedResult)
})

test('it should not rotate a vector when the angle is zero', () => {
  const vector = [1, 0, 0]
  const angle = 0
  const expectedResult = [1, 0, 0]

  expect(rotate(vector, angle)).toStrictEqual(expectedResult)
})

test('it should rotate a vector by a certain angle', () => {
  const vector = [1, 0, 0]
  const angle = pi() / 4
  const expectedResult = [0.7071067811865475, -0, 0.7071067811865476] // close to [cos(pi/4), 0, sin(pi/4)]

  expect(rotate(vector, angle)).toStrictEqual(expectedResult)
})

test('it should rotate a vector that faces left by a certain angle', () => {
  const vector = [-1, 0, 0]
  const angle = pi() / 4
  const expectedResult = [-0.7071067811865475, -0, -0.7071067811865476] // close to [cos(-3/4pi), 0, sin(-3/4pi)]

  expect(rotate(vector, angle)).toStrictEqual(expectedResult)
})

test('it should change the angle of a vector', () => {
  const vector = [cos(pi() / 4), 0, sin(pi() / 4)]
  const expectedResult = [6.123233995736766e-17, 0, 1] // close to [0, 0, 1]

  expect(setAngle(vector, 1.5707963267948966)).toStrictEqual(expectedResult)
})

test('it should change magnitude of a vector (aka setLength)', () => {
  const vector = [3, 4]
  const magnitude = 10
  const expectedResult = [6, 8]

  expect(setMagnitude(vector, magnitude)).toStrictEqual(expectedResult)
})

test('it should change magnitude of a negative vector', () => {
  const vector = [-3, -4]
  const magnitude = 10
  const expectedResult = [-6, -8]

  expect(setMagnitude(vector, magnitude)).toStrictEqual(expectedResult)
})

test('it should shift a vector at a certain index', () => {
  const vector = [1, 2, 3, 4, 5]
  const index = 2
  const expectedResult = [3, 4, 5, 1, 2]

  expect(shift(vector, index)).toStrictEqual(expectedResult)
})

test('it should convert a 2D polar vector to cartesian coordinates', () => {
  const vector = [2 ** 0.5, pi() / 4]
  const expectedResult = [1.0000000000000002, 1]

  expect(toCartesian(vector)).toStrictEqual(expectedResult)
})

test('it should convert a 3D cartesian vector to cylindrical coordinates', () => {
  const vector = [1, 1, 1]
  const expectedResult = [1.2247448713915892, 1.224744871391589, 1]

  expect(toCylindrical(vector)).toStrictEqual(expectedResult)
})

test('it should convert a 2D cartesian vector to polar coordinates', () => {
  const vector = [1, 1]
  const expectedResult = [2 ** 0.5, pi() / 4]

  expect(toPolar(vector)).toStrictEqual(expectedResult)
})

test('it should create a string representation of an integer vector', () => {
  const vector = [3, 4]
  const expectedResult = '[3, 4]'

  expect(toString(vector)).toBe(expectedResult)
})

test('it should create a string representation of a float vector', () => {
  const vector = [pi() / 4, pi() / 4]
  const decimals = 2
  const expectedResult = '[0.79, 0.79]'

  expect(toString(vector, decimals)).toBe(expectedResult)
})

test('it should create a unit vector oriented on the X-axis', () => {
  expect(unit()).toStrictEqual([1, 0, 0])
})

test('it should create a unit vector oriented on the Z-axis', () => {
  expect(unit(pi() / 2)).toStrictEqual([6.123233995736766e-17, 0, 1]) // close to [0, 0, 1]
})
