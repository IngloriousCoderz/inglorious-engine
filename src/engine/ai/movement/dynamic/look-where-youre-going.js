import {
  angle,
  magnitude,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"

import align from "./align.js"

export default function lookWhereYoureGoing(instance, dt, options) {
  const velocity = instance.velocity ?? zero()

  if (!magnitude(velocity)) {
    return instance
  }

  return align(instance, { orientation: angle(velocity) }, dt, options)
}
