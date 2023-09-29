import { angle, magnitude, subtract } from '@ezpz/utils/vectors'

import align from './align'

export default function face(character, target, options) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  return align(character, { ...target, orientation: angle(direction) }, options)
}
