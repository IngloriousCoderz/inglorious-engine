import { randomBinomial } from '@ezpz/utils/math/random'
import { angle, rotate, setMagnitude } from '@ezpz/utils/vectors/vector'
import { sum } from '@ezpz/utils/vectors/vectors'

export default function wander(character, { elapsed }) {
  const rotation = randomBinomial() * character.maxRotation

  let velocity = setMagnitude(character.direction, character.maxSpeed * elapsed)
  velocity = rotate(velocity, rotation)

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
