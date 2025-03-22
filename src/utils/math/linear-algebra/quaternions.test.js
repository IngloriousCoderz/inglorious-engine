import { cos, pi, sin } from '@inglorious/utils/math/trigonometry.js'
import { expect, test } from 'vitest'

import { quaternion } from './quaternion.js'
import { combine } from './quaternions.js'

test('it should combine two zero-angle quaternions by giving the same 0-angle quaternion', () => {
  const q1 = quaternion(0)
  const q2 = quaternion(0)
  const expectedResult = [1, 0, 0, 0]

  expect(combine(q1, q2)).toStrictEqual(expectedResult)
})

test('it should combine a zero-angle quaternion with a nonzero-angle quaternion', () => {
  const q1 = quaternion(0)
  const q2 = quaternion(pi() / 2)
  const expectedResult = [cos(pi() / 4), 0, sin(pi() / 4), 0]

  expect(combine(q1, q2)).toStrictEqual(expectedResult)
})

test('it should combine two nonzero-angle quaternions', () => {
  const q1 = quaternion(pi() / 2)
  const q2 = quaternion(pi() / 2)
  const expectedResult = [2.220446049250313e-16, 0, 1, 0] // close to [0, 0, 1, 0]

  expect(combine(q1, q2)).toStrictEqual(expectedResult)
})
