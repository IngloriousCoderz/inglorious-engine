import { abs, clamp } from '@ezpz/utils/math/numbers'
import { toRange } from '@ezpz/utils/math/trigonometry'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_SLOW_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 1

export default function align(
  instance,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    slowRadius = DEFAULT_SLOW_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const direction = toRange(target.orientation - instance.orientation)
  const distance = abs(direction)

  if (distance < targetRadius) {
    return instance
  }

  let targetRotationSpeed
  if (distance > slowRadius) {
    targetRotationSpeed = instance.maxRotation
  } else {
    targetRotationSpeed = (distance * instance.maxRotation) / slowRadius
  }
  targetRotationSpeed *= direction / distance // restore rotation sign
  const targetAngularVelocity = targetRotationSpeed * elapsed

  const angularVelocityDelta = targetAngularVelocity - instance.angularVelocity

  let angularAcceleration = angularVelocityDelta / timeToTarget
  angularAcceleration = clamp(
    angularAcceleration,
    -instance.maxAngularAcceleration * elapsed,
    instance.maxAngularAcceleration * elapsed
  )

  const angularVelocity = instance.angularVelocity + angularAcceleration
  const orientation = instance.orientation + angularVelocity

  return { angularVelocity, orientation }
}
