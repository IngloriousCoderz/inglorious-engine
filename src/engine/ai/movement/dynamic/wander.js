import { createVector } from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { randomBinomial } from '@inglorious/utils/math/rng'

import seek from './seek'

export const DEFAULT_WANDER_OFFSET = 100
export const DEFAULT_WANDER_RADIUS = 100

const DEFAULT_MAX_ANGULAR_SPEED = 0

const DEFAULT_ORIENTATION = 0

export default function wander(
  instance,
  {
    wanderOffset = DEFAULT_WANDER_OFFSET,
    wanderRadius = DEFAULT_WANDER_RADIUS,
    ...options
  }
) {
  const maxAngularSpeed = instance.maxAngularSpeed ?? DEFAULT_MAX_ANGULAR_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  let position = sum(instance.position, createVector(wanderOffset, orientation))

  orientation += randomBinomial() * maxAngularSpeed
  position = sum(position, createVector(wanderRadius, orientation))

  return seek(instance, { position }, options)
}
