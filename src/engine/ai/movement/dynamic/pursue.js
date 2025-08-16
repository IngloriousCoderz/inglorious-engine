import {
  magnitude,
  multiply,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract, sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

import seek from "./seek.js"

export const DEFAULT_MAX_PREDICTION = 10

export default function pursue(
  instance,
  target,
  dt,
  { maxPrediction = DEFAULT_MAX_PREDICTION },
) {
  const velocity = instance.velocity ?? zero()

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

  return seek(instance, { ...target, position }, dt)
}
