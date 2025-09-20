import { randomBinomial } from "@inglorious/utils/math/rng.js"
import { angle, createVector, multiply } from "@inglorious/utils/math/vector.js"
import { sum } from "@inglorious/utils/math/vectors.js"

const DEFAULT_MAX_SPEED = 0
const DEFAULT_MAX_ANGULAR_SPEED = 0

const DEFAULT_ORIENTATION = 0

export function wander(entity, dt) {
  const maxSpeed = entity.maxSpeed ?? DEFAULT_MAX_SPEED
  const maxAngularSpeed = entity.maxAngularSpeed ?? DEFAULT_MAX_ANGULAR_SPEED

  let orientation = entity.orientation ?? DEFAULT_ORIENTATION
  orientation += randomBinomial() * maxAngularSpeed

  const velocity = createVector(maxSpeed, orientation)

  const position = sum(entity.position, multiply(velocity, dt))
  orientation = angle(velocity)

  return { velocity, position, orientation }
}
