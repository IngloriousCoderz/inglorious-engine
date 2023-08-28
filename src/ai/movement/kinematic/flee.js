import * as vectors from '../../../utils/vectors'

export default function flee(character, target) {
  let velocity = vectors.subtract(character.position, target.position)

  if (!vectors.magnitude(velocity)) {
    return character
  }

  velocity = vectors.normalize(velocity)
  velocity = vectors.multiply(character.speed, velocity)

  const position = vectors.sum(character.position, velocity)
  const orientation = vectors.angle(velocity)

  return { position, velocity, orientation }
}
