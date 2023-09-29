import { magnitude, setMagnitude, subtract } from '@ezpz/utils/vectors'

import matchVelocity from './match-velocity'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 100
export const DEFAULT_TIME_TO_TARGET = 1

export default function arrive(
  character,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    slowRadius = DEFAULT_SLOW_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (distance < targetRadius) {
    return character
  }

  let targetSpeed
  if (distance > slowRadius) {
    targetSpeed = character.maxSpeed
  } else {
    targetSpeed = (distance * character.maxSpeed) / slowRadius
  }
  const targetVelocity = setMagnitude(direction, targetSpeed * elapsed)

  return matchVelocity(
    character,
    { velocity: targetVelocity },
    { elapsed, timeToTarget }
  )
}
