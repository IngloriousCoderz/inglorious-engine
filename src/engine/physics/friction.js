import { magnitude, setMagnitude } from '@ezpz/utils/math/linear-algebra/vector'

export function applyFriction(instance, { dt }) {
  const length = magnitude(instance.velocity)

  instance.velocity = length
    ? setMagnitude(instance.velocity, length - instance.friction * dt)
    : instance.velocity

  return instance
}
