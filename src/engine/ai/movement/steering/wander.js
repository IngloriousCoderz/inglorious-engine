import {
  fromAngle,
  multiply,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@inglorious/utils/math/rng'

import seek from './seek'

export const DEFAULT_WANDER_OFFSET = 10
export const DEFAULT_WANDER_RADIUS = 10

export default function wander(
  instance,
  {
    wanderOffset = DEFAULT_WANDER_OFFSET,
    wanderRadius = DEFAULT_WANDER_RADIUS,
    ...options
  }
) {
  const targetOrientation =
    instance.orientation + randomBinomial() * instance.maxRotation

  let targetPosition = sum(
    instance.position,
    multiply(fromAngle(instance.orientation), wanderOffset)
  )
  targetPosition = sum(
    targetPosition,
    multiply(fromAngle(targetOrientation), wanderRadius)
  )

  return seek(instance, { position: targetPosition }, options)
}
