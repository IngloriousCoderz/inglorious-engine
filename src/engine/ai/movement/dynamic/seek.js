import {
  angle,
  clamp,
  magnitude,
  multiply,
  setMagnitude,
  ZERO_VECTOR,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

const DEFAULT_MAX_ACCELERATION = 0
const DEFAULT_MAX_SPEED = 0

const MIN_SPEED = 0

const HALF_ACCELERATION = 0.5

export default function seek(instance, target, { dt }) {
  const maxAcceleration = instance.maxAcceleration ?? DEFAULT_MAX_ACCELERATION
  const maxSpeed = instance.maxSpeed ?? DEFAULT_MAX_SPEED

  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const acceleration = setMagnitude(direction, maxAcceleration)

  let velocity = instance.velocity ?? ZERO_VECTOR
  velocity = sum(velocity, multiply(acceleration, dt))
  velocity = clamp(velocity, MIN_SPEED, maxSpeed)

  const position = sum(
    instance.position,
    multiply(velocity, dt),
    multiply(acceleration, HALF_ACCELERATION * dt * dt)
  )

  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
