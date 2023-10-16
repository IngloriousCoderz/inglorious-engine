import {
  angle,
  magnitude,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

export default function flee(instance, target, { dt }) {
  const direction = subtract(instance.position, target.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const velocity = setMagnitude(direction, instance.maxSpeed * dt)

  const position = sum(instance.position, velocity)
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
