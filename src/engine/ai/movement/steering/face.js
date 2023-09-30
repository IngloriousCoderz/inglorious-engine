import { angle, magnitude } from '@ezpz/utils/vectors/vector'
import { subtract } from '@ezpz/utils/vectors/vectors'

import align from './align'

export default function face(character, target, options) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  const orientation = angle(direction)

  return align(character, { ...target, orientation }, options)
}
