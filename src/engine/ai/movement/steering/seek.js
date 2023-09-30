import {
  angle,
  clamp,
  magnitude,
  setMagnitude,
} from '@ezpz/utils/vectors/vector'
import { subtract, sum } from '@ezpz/utils/vectors/vectors'

const MIN_SPEED = 0

export default function seek(character, target, { elapsed }) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  const acceleration = setMagnitude(
    direction,
    character.maxAcceleration * elapsed
  )

  let velocity = sum(character.velocity, acceleration)
  velocity = clamp(velocity, MIN_SPEED, character.maxSpeed)
  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
