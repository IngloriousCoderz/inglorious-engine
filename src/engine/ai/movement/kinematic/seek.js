import {
  angle,
  magnitude,
  setMagnitude,
  subtract,
  sum,
} from '../../../../utils/vectors'

export default function seek(character, target, { elapsed }) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  const velocity = setMagnitude(direction, character.maxSpeed * elapsed)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
