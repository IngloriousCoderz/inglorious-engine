import {
  angle,
  clamp,
  magnitude,
  multiply,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { applyFriction } from '@inglorious/utils/physics/friction'

const MIN_ACCELERATION = 0
const MIN_SPEED = 0
const HALF_ACCELERATION = 0.5
const ORIENTATION_CHANGE_THRESHOLD = 4

export default function move(instance, { dt }) {
  const acceleration = clamp(
    instance.acceleration,
    MIN_ACCELERATION,
    instance.maxAcceleration
  )

  let velocity = clamp(
    sum(instance.velocity, multiply(acceleration, dt)),
    MIN_SPEED,
    instance.maxSpeed
  )
  velocity = applyFriction({ velocity, friction: instance.friction }, { dt })

  const position = sum(
    instance.position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt)
  )

  const orientation =
    magnitude(velocity) > ORIENTATION_CHANGE_THRESHOLD
      ? angle(velocity)
      : instance.orientation

  return { acceleration, velocity, position, orientation }
}
