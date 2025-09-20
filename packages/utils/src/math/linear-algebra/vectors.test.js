import { expect, test } from "vitest"

import { v } from "./vector.js"
import { cross, distance, dot, subtract, sum } from "./vectors.js"

test("it should compute the cross product between two vectors (aka vectorProduct)", () => {
  const vector1 = v(1, 2, 3)
  const vector2 = v(4, 5, 6)
  const expectedResult = v(-3, 6, -3)

  expect(cross(vector1, vector2)).toStrictEqual(expectedResult)
})

test("it should compute the cross product of multiple vectors (aka vectorProduct)", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(7, 8, 9)]
  const expectedResult = v(78, 6, -66)

  expect(cross(...vectors)).toStrictEqual(expectedResult)
})

test("it should compute the distance between multiple vectors", () => {
  const vectors = [v(0, 0, 0), v(4, 0, 3)]
  const expectedResult = 5

  expect(distance(...vectors)).toStrictEqual(expectedResult)
})

test("it should compute the dot product of multiple vectors (aka scalarProduct)", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(7, 8, 9)]
  const expectedResult = 270

  expect(dot(...vectors)).toStrictEqual(expectedResult)
})

test("it should subtract multiple vectors", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(7, 8, 9)]
  const expectedResult = v(-10, -11, -12)

  expect(subtract(...vectors)).toStrictEqual(expectedResult)
})

test("it should sum multiple vectors (aka add)", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(7, 8, 9)]
  const expectedResult = v(12, 15, 18)

  expect(sum(...vectors)).toStrictEqual(expectedResult)
})
