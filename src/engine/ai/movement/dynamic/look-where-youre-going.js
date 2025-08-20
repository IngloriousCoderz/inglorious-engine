import { align } from "@inglorious/engine/ai/movement/dynamic/align.js"
import {
  angle,
  magnitude,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"

export function lookWhereYoureGoing(instance, dt, options) {
  const velocity = instance.velocity ?? zero()

  if (!magnitude(velocity)) {
    return instance
  }

  return align(instance, { orientation: angle(velocity) }, dt, options)
}
