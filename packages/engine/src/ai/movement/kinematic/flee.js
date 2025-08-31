import {
  angle,
  magnitude,
  multiply,
  setMagnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract, sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

const DEFAULT_MAX_SPEED = 0

export function flee(entity, target, dt) {
  const maxSpeed = entity.maxSpeed ?? DEFAULT_MAX_SPEED

  const direction = subtract(entity.position, target.position)
  const distance = magnitude(direction)

  if (!distance) {
    return entity
  }

  const velocity = setMagnitude(direction, maxSpeed)
  const position = sum(entity.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
