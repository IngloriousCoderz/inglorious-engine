import {
  magnitude,
  setMagnitude,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'

const NO_FRICTION = 0
const DEFAULT_OPTIONS = { dt: 0 }

export function applyFriction(
  { velocity = ZERO_VECTOR, friction = NO_FRICTION },
  options = DEFAULT_OPTIONS
) {
  const { dt } = options
  const length = magnitude(velocity)

  return length ? setMagnitude(velocity, length - friction * dt) : velocity
}
