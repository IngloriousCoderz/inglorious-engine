import {
  angle,
  magnitude,
  multiply,
  setMagnitude,
} from "@inglorious/utils/math/vector.js"
import { subtract, sum } from "@inglorious/utils/math/vectors.js"

const DEFAULT_MAX_SPEED = 0

export function seek(entity, target, dt) {
  const maxSpeed = entity.maxSpeed ?? DEFAULT_MAX_SPEED

  const direction = subtract(target.position, entity.position)
  const distance = magnitude(direction)

  if (!distance) {
    return entity
  }

  const velocity = setMagnitude(direction, maxSpeed)
  const position = sum(entity.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
