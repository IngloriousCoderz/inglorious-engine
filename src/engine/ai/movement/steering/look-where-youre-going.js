import { angle, magnitude } from '@ezpz/utils/math/linear-algebra/vector'

import align from './align'

export default function lookWhereYoureGoing(character, _, options) {
  const speed = magnitude(character.velocity)

  if (!speed) {
    return character
  }

  return align(character, { orientation: angle(character.velocity) }, options)
}