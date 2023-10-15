import {
  angle,
  clamp,
  magnitude,
  multiply,
} from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'

export const DEFAULT_TIME_TO_TARGET = 1
const MIN_SPEED = 0

export default function move(instance, { dt }) {
  const velocity = clamp(instance.velocity, MIN_SPEED, instance.maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  const orientation = magnitude(instance.velocity)
    ? angle(instance.velocity)
    : instance.orientation

  return { position, orientation }
}
