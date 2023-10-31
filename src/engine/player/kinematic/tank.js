import {
  clamp,
  multiply,
  rotate,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { toRange } from '@inglorious/utils/math/trigonometry'

const DEFAULT_MAX_SPEED = 0

const DEFAULT_ORIENTATION = 0

export default function tank(instance, { dt }) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation = toRange(orientation)

  let velocity = instance.velocity ?? ZERO_VECTOR
  velocity = rotate(velocity, orientation)
  velocity = clamp(velocity, -maxSpeed, maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  return { velocity, position, orientation }
}
