import {
  clamp,
  multiply,
  rotate,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { toRange } from '@inglorious/utils/math/trigonometry'
import { applyFriction } from '@inglorious/utils/physics/friction'

export default function tank(instance, { dt }) {
  const orientation = toRange(instance.orientation)

  let acceleration = clamp(
    instance.acceleration,
    -instance.maxAcceleration,
    instance.maxAcceleration
  )
  acceleration = rotate(acceleration, orientation)
  let velocity = sum(instance.velocity, acceleration)
  velocity = clamp(velocity, -instance.maxSpeed, instance.maxSpeed)
  velocity = applyFriction({ velocity, friction: instance.friction }, { dt })
  const position = sum(instance.position, multiply(velocity, dt))

  return { velocity, position, orientation }
}
