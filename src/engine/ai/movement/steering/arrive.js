import {
  magnitude,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'

import matchVelocity from './match-velocity'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 100
export const DEFAULT_TIME_TO_TARGET = 1

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
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (distance < targetRadius) {
    return instance
  }

  let targetSpeed
  if (distance > slowRadius) {
    targetSpeed = instance.maxSpeed
  } else {
    targetSpeed = (distance * instance.maxSpeed) / slowRadius
  }
  const targetVelocity = setMagnitude(direction, targetSpeed * dt)

  return matchVelocity(
    instance,
    { velocity: targetVelocity },
    { dt, timeToTarget }
  )
}
