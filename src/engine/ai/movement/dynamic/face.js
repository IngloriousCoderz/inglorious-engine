import { align } from "@inglorious/engine/ai/movement/dynamic/align.js"
import {
  angle,
  magnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

export function face(instance, target, dt, options) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const orientation = angle(direction)

  return align(instance, { ...target, orientation }, dt, options)
}
