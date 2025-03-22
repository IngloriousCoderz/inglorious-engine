import {
  angle,
  magnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

import align from "./align.js"

export default function face(instance, target, options) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const orientation = angle(direction)

  return align(instance, { ...target, orientation }, options)
}
