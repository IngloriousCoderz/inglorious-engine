import {
  clamp,
  multiply,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector.js'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors.js'

const DEFAULT_OPTIONS = { dt: 0 }

export function applyVelocity(
  { maxSpeed, velocity = ZERO_VECTOR, position = ZERO_VECTOR },
  options = DEFAULT_OPTIONS
) {
  const { dt } = options

  velocity = clamp(velocity, -maxSpeed, maxSpeed)

  position = sum(position, multiply(velocity, dt))
  return { velocity, position }
}
