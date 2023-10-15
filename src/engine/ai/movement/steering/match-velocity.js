import {
  angle,
  clamp,
  divide,
  magnitude,
} from '@ezpz/utils/math/linear-algebra/vector'
import { subtract, sum } from '@ezpz/utils/math/linear-algebra/vectors'

export const DEFAULT_TIME_TO_TARGET = 1

const MIN_ACCELERATION = 0

export default function matchVelocity(
  instance,
  target,
  { dt, timeToTarget = DEFAULT_TIME_TO_TARGET }
) {
  const velocityDelta = subtract(target.velocity, instance.velocity)

  let acceleration = divide(velocityDelta, timeToTarget)
  acceleration = clamp(
    acceleration,
    MIN_ACCELERATION,
    instance.maxAcceleration * dt
  )

  const velocity = sum(instance.velocity, acceleration)
  const position = sum(instance.position, velocity)
  const orientation = magnitude(velocity)
    ? angle(velocity)
    : instance.orientation

  return { acceleration, velocity, position, orientation }
}
