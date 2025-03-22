import {
  clamp,
  multiply,
  zero,
} from '@inglorious/utils/math/linear-algebra/vector.js'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors.js'

const DEFAULT_OPTIONS = { dt: 0 }

export function applyVelocity(
  { maxSpeed, velocity = zero(), position = zero() },
  options = DEFAULT_OPTIONS
) {
  const { dt } = options

  velocity = clamp(velocity, -maxSpeed, maxSpeed)

  position = sum(position, multiply(velocity, dt))
  return { velocity, position }
}
