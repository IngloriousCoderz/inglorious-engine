import {
  angle,
  magnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { applyVelocity } from "@inglorious/utils/physics/velocity.js"

const DEFAULT_ORIENTATION = 0

export default function modernMove(instance, dt) {
  const { velocity, position } = applyVelocity(instance, dt)

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation = magnitude(velocity) ? angle(velocity) : orientation

  return { velocity, position, orientation }
}
