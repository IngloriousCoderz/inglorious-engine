import { angle, clamp, divide, magnitude } from '@ezpz/utils/vectors/vector'
import { subtract, sum } from '@ezpz/utils/vectors/vectors'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_TIME_TO_TARGET = 1

const MIN_SPEED = 0

export default function arrive(
  character,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (distance < targetRadius) {
    return character
  }

  let velocity = divide(direction, timeToTarget)
  velocity = clamp(velocity, MIN_SPEED, character.maxSpeed * elapsed)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
