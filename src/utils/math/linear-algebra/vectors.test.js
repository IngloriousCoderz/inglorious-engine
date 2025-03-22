import { expect, test } from 'vitest'

import { cross, distance, dot, subtract, sum } from './vectors.js'

test('it should compute the cross product between two vectors (aka vectorProduct)', () => {
  const vector1 = [1, 2, 3]
  const vector2 = [4, 5, 6]
  const expectedResult = [-3, 6, -3]

  expect(cross(vector1, vector2)).toStrictEqual(expectedResult)
})

test('it should compute the cross product of multiple vectors (aka vectorProduct)', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = [78, 6, -66]

  expect(cross(...vectors)).toStrictEqual(expectedResult)
})

test('it should compute the distance between multiple vectors', () => {
  const vectors = [
    [0, 0, 0],
    [4, 0, 3],
  ]
  const expectedResult = 5

  expect(distance(...vectors)).toStrictEqual(expectedResult)
})

test('it should compute the dot product of multiple vectors (aka scalarProduct)', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = 270

  expect(dot(...vectors)).toStrictEqual(expectedResult)
})

test('it should subtract multiple vectors', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = [-10, -11, -12]

  expect(subtract(...vectors)).toStrictEqual(expectedResult)
})

test('it should sum multiple vectors (aka add)', () => {
  const vectors = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const expectedResult = [12, 15, 18]

  expect(sum(...vectors)).toStrictEqual(expectedResult)
})
