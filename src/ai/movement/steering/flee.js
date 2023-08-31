import {
  angle,
  magnitude,
  setMagnitude,
  subtract,
  sum,
} from '../../../utils/vectors'

export default function flee(character, target, { elapsed }) {
  const direction = subtract(character.position, target.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  const acceleration = setMagnitude(
    direction,
    character.maxAcceleration * elapsed
  )

  const velocity = sum(character.velocity, acceleration)
  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
