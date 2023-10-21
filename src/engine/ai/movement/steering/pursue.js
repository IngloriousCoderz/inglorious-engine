import {
  magnitude,
  multiply,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

import seek from './seek'

export const DEFAULT_MAX_PREDICTION = 10

export default function pursue(
  instance,
  target,
  { dt, maxPrediction = DEFAULT_MAX_PREDICTION }
) {
  const velocity = instance.velocity ?? ZERO_VECTOR

  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const speed = magnitude(velocity)

  let prediction
  if (speed <= distance / maxPrediction) {
    prediction = maxPrediction
  } else {
    prediction = distance / speed
  }

  const position = sum(target.position, multiply(target.velocity, prediction))

  return seek(instance, { ...target, position }, { dt })
}
