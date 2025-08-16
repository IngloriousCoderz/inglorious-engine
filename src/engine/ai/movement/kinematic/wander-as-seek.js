import {
  fromAngle,
  multiply,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { randomBinomial } from "@inglorious/utils/math/rng.js"

import seek from "./seek.js"

export const DEFAULT_WANDER_RADIUS = 10

const DEFAULT_MAX_ANGULAR_SPEED = 0

const DEFAULT_ORIENTATION = 0

export default function wander(
  instance,
  dt,
  { wanderRadius = DEFAULT_WANDER_RADIUS },
) {
  const maxAngularSpeed = instance.maxAngularSpeed ?? DEFAULT_MAX_ANGULAR_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation += randomBinomial() * maxAngularSpeed

  const position = sum(
    instance.position,
    multiply(fromAngle(orientation), wanderRadius),
  )

  return seek(instance, { position }, dt)
}
