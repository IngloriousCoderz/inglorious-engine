import { angle, magnitude } from '../../../utils/vectors'
import align from './align'

export default function lookWhereYoureGoing(character, target, options) {
  const speed = magnitude(character.velocity)

  if (!speed) {
    return character
  }

  return align(character, { orientation: angle(character.velocity) }, options)
}
