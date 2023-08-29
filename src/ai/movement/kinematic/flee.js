import {
  angle,
  magnitude,
  multiply,
  normalize,
  subtract,
  sum,
} from '../../../utils/vectors'

export default function flee(character, target, { elapsed }) {
  let velocity = subtract(character.position, target.position)

  if (!magnitude(velocity)) {
    return character
  }

  velocity = normalize(velocity)
  velocity = multiply(velocity, character.maxSpeed * elapsed)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
