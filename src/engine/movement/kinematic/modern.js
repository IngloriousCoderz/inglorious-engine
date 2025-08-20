import {
  angle,
  magnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { applyVelocity } from "@inglorious/utils/physics/velocity.js"

const DEFAULT_ORIENTATION = 0

export function modernMove(entity, dt) {
  const { velocity, position } = applyVelocity(entity, dt)

  let orientation = entity.orientation ?? DEFAULT_ORIENTATION
  orientation = magnitude(velocity) ? angle(velocity) : orientation

  return { velocity, position, orientation }
}
