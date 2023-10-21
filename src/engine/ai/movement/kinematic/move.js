import {
  angle,
  clamp,
  magnitude,
  multiply,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'

const DEFAULT_MAX_SPEED = 0

const DEFAULT_ORIENTATION = 0

const MIN_SPEED = 0

export default function move(instance, { dt }) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  let velocity = instance.velocity ?? ZERO_VECTOR
  velocity = clamp(velocity, MIN_SPEED, maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  orientation = magnitude(velocity) ? angle(velocity) : orientation

  return { velocity, position, orientation }
}
