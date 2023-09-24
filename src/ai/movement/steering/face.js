import { angle, magnitude, subtract } from '../../../utils/vectors'
import align from './align'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_SLOW_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 1

export default function face(character, target, options) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  return align(character, { ...target, orientation: angle(direction) }, options)
}
