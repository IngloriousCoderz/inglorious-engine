import {
  angle,
  clamp,
  magnitude,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

const MIN_SPEED = 0

export default function seek(instance, target, { dt }) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const acceleration = setMagnitude(direction, instance.maxAcceleration * dt)

  let velocity = sum(instance.velocity, acceleration)
  velocity = clamp(velocity, MIN_SPEED, instance.maxSpeed)
  const position = sum(instance.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
