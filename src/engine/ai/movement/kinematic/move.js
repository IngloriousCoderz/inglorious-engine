import {
  angle,
  clamp,
  magnitude,
  multiply,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'

const MIN_SPEED = 0

export default function move(instance, { dt }) {
  let velocity = instance.velocity ?? ZERO_VECTOR
  velocity = clamp(velocity, MIN_SPEED, instance.maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  const orientation = magnitude(velocity)
    ? angle(velocity)
    : instance.orientation

  return { velocity, position, orientation }
}
