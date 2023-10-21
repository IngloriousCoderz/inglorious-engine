import {
  angle,
  clamp,
  magnitude,
  multiply,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { applyFriction } from '@inglorious/utils/physics/friction'

const DEFAULT_MAX_ACCELERATION = 0
const DEFAULT_MAX_SPEED = 0
const DEFAULT_FRICTION = 0

const DEFAULT_ORIENTATION = 0

const MIN_ACCELERATION = 0
const MIN_SPEED = 0
const HALF_ACCELERATION = 0.5
const ORIENTATION_CHANGE_THRESHOLD = 4

export default function move(instance, { dt }) {
  const maxAcceleration = instance.maxAcceleration ?? DEFAULT_MAX_ACCELERATION
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED
  const friction = instance.friction ?? DEFAULT_FRICTION

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  let acceleration = instance.acceleration ?? ZERO_VECTOR
  acceleration = clamp(acceleration, MIN_ACCELERATION, maxAcceleration)

  let velocity = instance.velocity ?? ZERO_VECTOR
  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, MIN_SPEED, maxSpeed)
  velocity = applyFriction({ velocity, friction }, { dt })

  const position = sum(
    instance.position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt)
  )

  orientation =
    magnitude(velocity) > ORIENTATION_CHANGE_THRESHOLD
      ? angle(velocity)
      : orientation

  return { acceleration, velocity, position, orientation }
}
