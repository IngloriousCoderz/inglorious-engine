import {
  clamp,
  multiply,
  rotate,
} from '@inglorious/utils/math/linear-algebra/vector'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { toRange } from '@inglorious/utils/math/trigonometry'

export default function tank(instance, { dt }) {
  const orientation = toRange(instance.orientation)
  let velocity = rotate(instance.velocity, orientation)
  velocity = clamp(velocity, -instance.maxSpeed, instance.maxSpeed)
  const position = sum(instance.position, multiply(velocity, dt))

  return { velocity, position, orientation }
}
