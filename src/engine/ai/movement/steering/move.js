import { angle, clamp, magnitude } from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'

const MIN_ACCELERATION = 0
const MIN_SPEED = 0

export default function move(instance, { elapsed }) {
  const acceleration = clamp(
    instance.acceleration,
    MIN_ACCELERATION,
    instance.maxAcceleration * elapsed
  )

  const velocity = clamp(
    sum(instance.velocity, acceleration),
    MIN_SPEED,
    instance.maxSpeed * elapsed
  )
  const position = sum(instance.position, velocity)
  const orientation = magnitude(velocity)
    ? angle(velocity)
    : instance.orientation

  return { acceleration, velocity, position, orientation }
}
