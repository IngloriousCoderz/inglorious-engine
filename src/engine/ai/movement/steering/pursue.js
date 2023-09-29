import { magnitude, multiply, subtract, sum } from '../../../../utils/vectors'
import seek from './seek'

export const DEFAULT_MAX_PREDICTION = 10

export default function pursue(
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

  return seek(character, { ...target, position: targetPosition }, { elapsed })
}
