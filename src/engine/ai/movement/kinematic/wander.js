import {
  angle,
  fromAngle,
  multiply,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@inglorious/utils/math/random'

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
