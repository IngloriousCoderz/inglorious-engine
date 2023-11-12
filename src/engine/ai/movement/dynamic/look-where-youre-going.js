import {
  angle,
  magnitude,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector.js'

import align from './align.js'

export default function lookWhereYoureGoing(instance, options) {
  const velocity = instance.velocity ?? ZERO_VECTOR

  if (!magnitude(velocity)) {
    return instance
  }

  return align(instance, { orientation: angle(velocity) }, options)
}
