import { angle, magnitude, setMagnitude } from '@ezpz/utils/vectors/vector'
import { subtract, sum } from '@ezpz/utils/vectors/vectors'

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
