import {
  clamp,
  multiply,
  rotate,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { toRange } from "@inglorious/utils/math/trigonometry.js"

const DEFAULT_MAX_SPEED = 0

const DEFAULT_ORIENTATION = 0

export function tankMove(instance, dt) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation = toRange(orientation)

  let velocity = instance.velocity ?? zero()
  velocity = rotate(velocity, orientation)
  velocity = clamp(velocity, -maxSpeed, maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  return { velocity, position, orientation }
}
