import {
  magnitude,
  multiply,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

import flee from './flee'

export const DEFAULT_MAX_PREDICTION = 10

export default function evade(
  instance,
  target,
  { dt, maxPrediction = DEFAULT_MAX_PREDICTION }
) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const speed = magnitude(instance.velocity)

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

  return flee(instance, { ...target, position: targetPosition }, { dt })
}
