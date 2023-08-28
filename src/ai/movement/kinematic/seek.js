import {
  angle,
  magnitude,
  multiply,
  normalize,
  subtract,
  sum,
} from '../../../utils/vectors'

export default function seek(character, target, { elapsed }) {
  let velocity = subtract(target.position, character.position)

  if (!magnitude(velocity)) {
    return character
  }

  velocity = normalize(velocity)
  velocity = multiply(velocity, character.speed * elapsed)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { position, velocity, orientation }
}
