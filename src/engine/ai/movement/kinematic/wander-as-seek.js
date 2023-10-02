import { randomBinomial } from '@ezpz/utils/math/random'
import { fromAngle, multiply } from '@ezpz/utils/math/linear/vector'
import { sum } from '@ezpz/utils/math/linear/vectors'

import seek from './seek'

export const DEFAULT_WANDER_RADIUS = 10

export default function wander(
  character,
  { wanderRadius = DEFAULT_WANDER_RADIUS, ...options }
) {
  const targetOrientation =
    character.orientation + randomBinomial() * character.maxRotation

  const targetPosition = sum(
    character.position,
    multiply(fromAngle(targetOrientation), wanderRadius)
  )

  return seek(character, { position: targetPosition }, options)
}
