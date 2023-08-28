import * as vectors from '../../../utils/vectors'

const MILLISECONDS_IN_A_SECOND = 1000

export default function flee(character, target, { elapsed }) {
  let velocity = vectors.subtract(character.position, target.position)

  if (!vectors.magnitude(velocity)) {
    return character
  }

  velocity = vectors.normalize(velocity)
  velocity = vectors.multiply(character.speed, velocity)
  velocity = vectors.multiply(elapsed / MILLISECONDS_IN_A_SECOND, velocity)

  const position = vectors.sum(character.position, velocity)
  const orientation = vectors.angle(velocity)

  return { position, velocity, orientation }
}
