import {
  angle,
  fromAngle,
  multiply,
} from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@ezpz/utils/math/random'

export default function wander(character, { elapsed }) {
  const targetOrientation =
    character.orientation + randomBinomial() * character.maxRotation

  const velocity = multiply(
    fromAngle(targetOrientation),
    character.maxSpeed * elapsed
  )

  const position = sum(character.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
