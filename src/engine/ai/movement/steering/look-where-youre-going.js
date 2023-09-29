import { angle, magnitude } from '@ezpz/utils/vectors'

import align from './align'

export default function lookWhereYoureGoing(character, _, options) {
  const speed = magnitude(character.velocity)

  if (!speed) {
    return character
  }

  return align(character, { orientation: angle(character.velocity) }, options)
}
