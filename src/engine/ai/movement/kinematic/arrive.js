import {
  angle,
  clamp,
  divide,
  magnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_TIME_TO_TARGET = 1

const MIN_SPEED = 0

export default function arrive(
  instance,
  target,
  {
    dt,
    targetRadius = DEFAULT_TARGET_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (distance < targetRadius) {
    return instance
  }

  let velocity = divide(direction, timeToTarget)
  velocity = clamp(velocity, MIN_SPEED, instance.maxSpeed * dt)

  const position = sum(instance.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
