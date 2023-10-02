import { cosine, pi, sine } from '@ezpz/utils/math/trigonometry'
import { expect, test } from 'vitest'

import { quaternion } from './quaternion'

test('it should return the quaternion for no rotation', () => {
  const angle = 0
  const expectedResult = [1, 0, 0, 0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})

test('it should return the quaternion for a rotation of pi/2', () => {
  const angle = pi() / 2
  const expectedResult = [cosine(pi() / 4), 0, sine(pi() / 4), 0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})

test('it should return the quaternion for a rotation of negative pi/2', () => {
  const angle = -pi() / 2
  const expectedResult = [cosine(-pi() / 4), -0, sine(-pi() / 4), -0]

  expect(quaternion(angle)).toStrictEqual(expectedResult)
})
