import { seek } from "@inglorious/engine/ai/movement/dynamic/seek.js"
import { createVector } from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { randomBinomial } from "@inglorious/utils/math/rng.js"

export const DEFAULT_WANDER_OFFSET = 100
export const DEFAULT_WANDER_RADIUS = 100

const DEFAULT_MAX_ANGULAR_SPEED = 0

const DEFAULT_ORIENTATION = 0

export function wander(
  instance,
  dt,
  {
    wanderOffset = DEFAULT_WANDER_OFFSET,
    wanderRadius = DEFAULT_WANDER_RADIUS,
  } = {},
) {
  const maxAngularSpeed = instance.maxAngularSpeed ?? DEFAULT_MAX_ANGULAR_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  let position = sum(instance.position, createVector(wanderOffset, orientation))

  orientation += randomBinomial() * maxAngularSpeed
  position = sum(position, createVector(wanderRadius, orientation))

  return seek(instance, { position }, dt)
}
