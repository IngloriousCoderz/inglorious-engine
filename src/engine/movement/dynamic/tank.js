import {
  clamp,
  multiply,
  rotate,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { toRange } from "@inglorious/utils/math/trigonometry.js"
import { applyFriction } from "@inglorious/utils/physics/friction.js"

const DEFAULT_MAX_ACCELERATION = 0
const DEFAULT_MAX_SPEED = 0
const DEFAULT_FRICTION = 0

const DEFAULT_ORIENTATION = 0

const HALF_ACCELERATION = 0.5

export default function tankMove(instance, { dt }) {
  const maxAcceleration = instance.maxAcceleration ?? DEFAULT_MAX_ACCELERATION
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED
  const friction = instance.friction ?? DEFAULT_FRICTION

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation = toRange(orientation)

  let acceleration = instance.acceleration ?? zero()
  acceleration = rotate(acceleration, orientation)
  acceleration = clamp(acceleration, -maxAcceleration, maxAcceleration)

  let velocity = instance.velocity ?? zero()
  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, -maxSpeed, maxSpeed)
  velocity = applyFriction({ velocity, friction }, { dt })

  const position = sum(
    instance.position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt),
  )

  return { velocity, position, orientation }
}
