import {
  angle,
  clamp,
  magnitude,
  multiply,
  setMagnitude,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

const DEFAULT_MAX_SPEED = 0

const MIN_SPEED = 0

export default function flee(instance, target, { dt }) {
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  let velocity = instance.velocity ?? ZERO_VECTOR

  const direction = subtract(instance.position, target.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const acceleration = setMagnitude(direction, instance.maxAcceleration)

  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, MIN_SPEED, maxSpeed)

  const position = sum(instance.position, multiply(velocity, dt))

  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
