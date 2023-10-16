import { angle, magnitude } from '@inglorious/utils/math/linear-algebra/vector'

import align from './align'

export default function lookWhereYoureGoing(instance, options) {
  const speed = magnitude(instance.velocity)

  if (!speed) {
    return instance
  }

  return align(instance, { orientation: angle(instance.velocity) }, options)
}
