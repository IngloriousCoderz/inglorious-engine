import { fromAngle, multiply } from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@ezpz/utils/math/random'

import seek from './seek'

export const DEFAULT_WANDER_RADIUS = 10

export default function wander(
  instance,
  { wanderRadius = DEFAULT_WANDER_RADIUS, ...options }
) {
  const targetOrientation =
    instance.orientation + randomBinomial() * instance.maxRotation

  const targetPosition = sum(
    instance.position,
    multiply(fromAngle(targetOrientation), wanderRadius)
  )

  return seek(instance, { position: targetPosition }, options)
}
