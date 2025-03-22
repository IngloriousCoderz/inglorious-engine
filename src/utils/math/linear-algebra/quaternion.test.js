import { cos, pi, sin } from "@inglorious/utils/math/trigonometry.js"
import { expect, test } from "vitest"

import { quaternion } from "./quaternion.js"

test("it should return the quaternion for no rotation", () => {
  const angle = 0
  const expectedResult = [1, 0, 0, 0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})

test("it should return the quaternion for a rotation of pi/2", () => {
  const angle = pi() / 2
  const expectedResult = [cos(pi() / 4), 0, sin(pi() / 4), 0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})

test("it should return the quaternion for a rotation of negative pi/2", () => {
  const angle = -pi() / 2
  const expectedResult = [cos(-pi() / 4), -0, sin(-pi() / 4), -0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})
