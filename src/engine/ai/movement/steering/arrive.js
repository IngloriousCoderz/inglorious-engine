import {
  magnitude,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'

import matchVelocity from './match-velocity'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 100
export const DEFAULT_TIME_TO_TARGET = 0.1

const DEFAULT_MAX_SPEED = 0

export default function arrive(
  instance,
  target,
  {
    dt,
    targetRadius = DEFAULT_TARGET_RADIUS,
    slowRadius = DEFAULT_SLOW_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (distance < targetRadius) {
    return instance
  }

  let speed
  if (distance > slowRadius) {
    speed = maxSpeed
  } else {
    speed = (distance * maxSpeed) / slowRadius
  }
  const velocity = setMagnitude(direction, speed)

  return matchVelocity(instance, { velocity }, { dt, timeToTarget })
}
