import {
  clamp,
  multiply,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

import { applyFriction } from "./friction.js"

const DEFAULT_OPTIONS = { dt: 0 }

const HALF_ACCELERATION = 0.5

/*
Euler's Integration:
v += a * dt
p += v * dt + 1/2 * a * dt * dt
*/

export function applyAcceleration(
  {
    maxAcceleration,
    maxSpeed,
    acceleration = zero(),
    velocity = zero(),
    position = zero(),
    friction,
  },
  options = DEFAULT_OPTIONS,
) {
  const { dt } = options

  acceleration = clamp(acceleration, -maxAcceleration, maxAcceleration)

  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, -maxSpeed, maxSpeed)
  velocity = applyFriction({ velocity, friction }, { dt })

  position = sum(
    position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt),
  )

  return { acceleration, velocity, position }
}
