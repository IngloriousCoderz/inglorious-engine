import { expect, test } from 'vitest'

import { zero } from '../math/linear-algebra/vector.js'
import { applyFriction } from './friction.js'

test('it should apply no friction on no velocity', () => {
  const friction = 250
  const dt = 1

  expect(applyFriction({ friction }, { dt })).toStrictEqual(zero())
})

test('it should apply no friction if no friction is passed', () => {
  const velocity = [0, 0, 0]
  const dt = 1

  expect(applyFriction({ velocity }, { dt })).toBe(velocity)
})

test('it should apply no friction if no time passed', () => {
  const velocity = [0, 0, 0]
  const friction = 5

  expect(applyFriction({ velocity, friction })).toBe(velocity)
})

test('it should apply friction to some velocity', () => {
  const velocity = [8, 0, 6]
  const friction = 5
  const dt = 1
  const expectedResult = [4, 0, 3]

  expect(applyFriction({ velocity, friction }, { dt })).toStrictEqual(
    expectedResult
  )
})

test('it should stop movement when friction is equal to velocity', () => {
  const velocity = [8, 0, 6]
  const friction = 5
  const dt = 2

  expect(applyFriction({ velocity, friction }, { dt })).toStrictEqual(zero())
})
