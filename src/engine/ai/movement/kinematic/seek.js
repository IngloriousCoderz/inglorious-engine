import {
  angle,
  magnitude,
  multiply,
  setMagnitude,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { subtract, sum } from "@inglorious/utils/math/linear-algebra/vectors.js"

const DEFAULT_MAX_SPEED = 0

export default function seek(instance, target, { dt }) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const velocity = setMagnitude(direction, maxSpeed)
  const position = sum(instance.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
