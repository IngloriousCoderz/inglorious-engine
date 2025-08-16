import {
  angle,
  magnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { applyAcceleration } from "@inglorious/utils/physics/acceleration.js"

const DEFAULT_ORIENTATION = 0

const ORIENTATION_CHANGE_THRESHOLD = 4

export default function modernMove(instance, dt) {
  const { acceleration, velocity, position } = applyAcceleration(instance, dt)

  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  orientation =
    magnitude(velocity) > ORIENTATION_CHANGE_THRESHOLD
      ? angle(velocity)
      : orientation

  return { acceleration, velocity, position, orientation }
}
