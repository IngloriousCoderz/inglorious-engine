import { angle, clamp, divide } from '@ezpz/utils/math/linear/vector'
import { subtract, sum } from '@ezpz/utils/math/linear/vectors'

export const DEFAULT_TIME_TO_TARGET = 1

const MIN_ACCELERATION = 0

export default function matchVelocity(
  character,
  target,
  { elapsed, timeToTarget = DEFAULT_TIME_TO_TARGET }
) {
  const velocityDelta = subtract(target.velocity, character.velocity)

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
