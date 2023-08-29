import {
  angle,
  clamp,
  divide,
  magnitude,
  subtract,
  sum,
} from '../../../utils/vectors'

const DEFAULT_RADIUS = 0
const DEFAULT_TIME_TO_TARGET = 1
const MIN_SPEED = 0

export default function arrive(
  character,
  target,
  { elapsed, radius = DEFAULT_RADIUS, timeToTarget = DEFAULT_TIME_TO_TARGET }
) {
  let velocity = subtract(target.position, character.position)

  if (magnitude(velocity) < radius) {
    return character
  }

  velocity = divide(velocity, timeToTarget)
  velocity = clamp(velocity, MIN_SPEED, character.maxSpeed * elapsed)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
