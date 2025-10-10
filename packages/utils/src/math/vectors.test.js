import { expect, test } from "vitest"

import { v } from "../v.js"
import {
  cross,
  distance,
  divide,
  dot,
  multiply,
  power,
  subtract,
  sum,
} from "./vectors.js"

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

test("it should divide multiple vectors component-wise", () => {
  const vectors = [v(80, 40, 20), v(2, 4, 5), v(2, 2, 2)]
  const expectedResult = v(20, 5, 2)

  expect(divide(...vectors)).toStrictEqual(expectedResult)
})

test("it should compute the dot product of multiple vectors (aka scalarProduct)", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(7, 8, 9)]
  const expectedResult = 270

  expect(dot(...vectors)).toStrictEqual(expectedResult)
})

test("it should multiply multiple vectors component-wise (Hadamard product)", () => {
  const vectors = [v(1, 2, 3), v(4, 5, 6), v(2, 2, 2)]
  const expectedResult = v(8, 20, 36)

  expect(multiply(...vectors)).toStrictEqual(expectedResult)
})

test("it should raise a vector to the power of another vector", () => {
  const vectors = [v(2, 3, 4), v(4, 3, 2)]
  const expectedResult = v(16, 27, 16)

  expect(power(...vectors)).toStrictEqual(expectedResult)
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
