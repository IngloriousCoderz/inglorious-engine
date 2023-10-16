import { expect, test } from 'vitest'

import { ZERO_VECTOR } from '../math/linear-algebra/vector'
import { applyFriction } from './friction'

test('it should apply no friction on no velocity', () => {
  const friction = 250
  const dt = 1

  expect(applyFriction({ friction }, { dt })).toBe(ZERO_VECTOR)
})

test('it should apply no friction if no friction is passed', () => {
  const velocity = [0, 0, 0]
  const dt = 1

  expect(applyFriction({ velocity }, { dt })).toBe(velocity)
})

test('it should apply no friction if no time passed', () => {
  const velocity = [0, 0, 0]
  const friction = 250

  expect(applyFriction({ velocity, friction })).toBe(velocity)
})

test('it should stop movement when friction is equal to velocity', () => {
  const velocity = [250, 0, 0]
  const friction = 250
  const dt = 1

  expect(applyFriction({ velocity, friction }, { dt })).toStrictEqual(
    ZERO_VECTOR
  )
})
