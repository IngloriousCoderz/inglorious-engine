import { flee } from "@inglorious/engine/ai/movement/dynamic/flee.js"
import { magnitude, multiply, zero } from "@inglorious/utils/math/vector.js"
import { subtract, sum } from "@inglorious/utils/math/vectors.js"

export const DEFAULT_MAX_PREDICTION = 10

export function evade(
  entity,
  target,
  dt,
  { maxPrediction = DEFAULT_MAX_PREDICTION } = {},
) {
  let velocity = entity.velocity ?? zero()

  const direction = subtract(target.position, entity.position)
  const distance = magnitude(direction)

  if (!distance) {
    return entity
  }

  const speed = magnitude(velocity)

  let prediction
  if (speed <= distance / maxPrediction) {
    prediction = maxPrediction
  } else {
    prediction = distance / speed
  }

  const position = sum(target.position, multiply(target.velocity, prediction))

  return flee(entity, { ...target, position }, dt)
}
