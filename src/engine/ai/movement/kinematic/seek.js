import {
  angle,
  magnitude,
  multiply,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector'
import { subtract, sum } from '@inglorious/utils/math/linear-algebra/vectors'

export default function seek(instance, target, { dt }) {
  const direction = subtract(target.position, instance.position)
  const distance = magnitude(direction)

  if (!distance) {
    return instance
  }

  const velocity = setMagnitude(direction, instance.maxSpeed)
  const position = sum(instance.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}
