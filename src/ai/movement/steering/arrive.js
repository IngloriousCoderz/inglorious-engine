import {
  angle,
  clamp,
  divide,
  magnitude,
  setMagnitude,
  subtract,
  sum,
} from '../../../utils/vectors'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 100
export const DEFAULT_TIME_TO_TARGET = 1

const MIN_ACCELERATION = 0

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

  const velocityDelta = subtract(targetVelocity, character.velocity)

  let acceleration = divide(velocityDelta, timeToTarget)
  acceleration = clamp(
    acceleration,
    MIN_ACCELERATION,
    character.maxAcceleration * elapsed
  )

  const velocity = sum(character.velocity, acceleration)
  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
