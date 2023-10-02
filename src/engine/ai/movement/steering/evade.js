import { magnitude, multiply } from '@ezpz/utils/math/linear/vector'
import { subtract, sum } from '@ezpz/utils/math/linear/vectors'

import flee from './flee'

export const DEFAULT_MAX_PREDICTION = 10

export default function evade(
  character,
  target,
  { elapsed, maxPrediction = DEFAULT_MAX_PREDICTION }
) {
  const direction = subtract(target.position, character.position)
  const distance = magnitude(direction)

  if (!distance) {
    return character
  }

  const speed = magnitude(character.velocity)

  let prediction
  if (speed <= distance / maxPrediction) {
    prediction = maxPrediction
  } else {
    prediction = distance / speed
  }

  const targetPosition = sum(
    target.position,
    multiply(target.velocity, prediction)
  )

  return flee(character, { ...target, position: targetPosition }, { elapsed })
}
