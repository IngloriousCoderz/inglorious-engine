import {
  angle,
  clamp,
  divide,
  magnitude,
  multiply,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract, sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

export const DEFAULT_TIME_TO_TARGET = 0.1

const DEFAULT_MAX_ACCELERATION = 0
const DEFAULT_MAX_SPEED = 0
const DEFAULT_ORIENTATION = 0

const MIN_ACCELERATION = 0
const MIN_SPEED = 0

const HALF_ACCELERATION = 0.5

export default function matchVelocity(
  instance,
  target,
  dt,
  { timeToTarget = DEFAULT_TIME_TO_TARGET },
) {
  const maxAcceleration = instance.maxAcceleration ?? DEFAULT_MAX_ACCELERATION
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  let velocity = instance.velocity ?? zero()
  const velocityDelta = subtract(target.velocity, velocity)

  let acceleration = divide(velocityDelta, timeToTarget)
  acceleration = clamp(acceleration, MIN_ACCELERATION, maxAcceleration)

  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, MIN_SPEED, maxSpeed)

  const position = sum(
    instance.position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt),
  )

  orientation = magnitude(velocity) ? angle(velocity) : orientation

  return { acceleration, velocity, position, orientation }
}
