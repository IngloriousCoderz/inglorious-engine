import {
  angle,
  magnitude,
  setMagnitude,
  subtract,
  sum,
} from '../../../utils/vectors'

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

  const velocity = sum(character.velocity, acceleration)
  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
