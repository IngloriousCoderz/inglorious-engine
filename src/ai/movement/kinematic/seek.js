import * as vectors from '../../../utils/vectors'

export default function seek(character, target, { elapsed }) {
  let velocity = vectors.subtract(target.position, character.position)

  if (!vectors.magnitude(velocity)) {
    return character
  }

  velocity = vectors.normalize(velocity)
  velocity = vectors.multiply(character.speed, velocity)
  velocity = vectors.multiply(elapsed / 1000, velocity)

  const position = vectors.sum(character.position, velocity)
  const orientation = vectors.angle(velocity)

  return { position, velocity, orientation }
}
