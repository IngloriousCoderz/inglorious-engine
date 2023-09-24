import { abs, clamp, toRange } from '../../../utils/maths'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_SLOW_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 1

export default function align(
  character,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    slowRadius = DEFAULT_SLOW_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const orientationDelta = target.orientation - character.orientation
  const radius = toRange(orientationDelta)

  if (abs(radius) < targetRadius) {
    return character
  }

  let targetRotationSpeed
  if (abs(radius) > slowRadius) {
    targetRotationSpeed = character.maxRotation
  } else {
    targetRotationSpeed = (radius * character.maxRotation) / slowRadius
  }
  const targetAngularVelocity = targetRotationSpeed * elapsed

  const angularVelocityDelta = targetAngularVelocity - character.angularVelocity

  let angularAcceleration = angularVelocityDelta / timeToTarget
  angularAcceleration = clamp(
    angularAcceleration,
    -character.maxAngularAcceleration * elapsed,
    character.maxAngularAcceleration * elapsed
  )

  const angularVelocity = character.angularVelocity + angularAcceleration
  const orientation = character.orientation + angularVelocity

  return { angularVelocity, orientation }
}
