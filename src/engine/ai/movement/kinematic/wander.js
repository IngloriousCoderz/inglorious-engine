import {
  angle,
  fromAngle,
  multiply,
} from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@ezpz/utils/math/random'

export default function wander(instance, { dt }) {
  const targetOrientation =
    instance.orientation + randomBinomial() * instance.maxRotation

  const velocity = multiply(
    fromAngle(targetOrientation),
    instance.maxSpeed * dt
  )

  const position = sum(instance.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
