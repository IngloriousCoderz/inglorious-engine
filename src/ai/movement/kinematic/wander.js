import { randomBinomial } from '../../../utils/maths'
import { angle, multiply, rotate, sum } from '../../../utils/vectors'

export default function wander(character, { elapsed }) {
  const rotation = randomBinomial() * character.maxRotation

  let velocity = multiply(character.direction, character.maxSpeed * elapsed)
  velocity = rotate(velocity, rotation)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
