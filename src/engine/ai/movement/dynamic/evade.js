import { flee } from "@inglorious/engine/ai/movement/dynamic/flee.js"
import {
  magnitude,
  multiply,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract, sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

export const DEFAULT_MAX_PREDICTION = 10

export function evade(
  instance,
  target,
  dt,
  { maxPrediction = DEFAULT_MAX_PREDICTION } = {},
) {
  let velocity = instance.velocity ?? zero()

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

  return flee(instance, { ...target, position }, dt)
}
