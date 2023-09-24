import { abs, clamp, toRange } from '../../../utils/math'

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
  const direction = toRange(target.orientation - character.orientation)
  const distance = abs(direction)

  if (distance < targetRadius) {
    return character
  }

  let targetRotationSpeed
  if (distance > slowRadius) {
    targetRotationSpeed = character.maxRotation
  } else {
    targetRotationSpeed = (distance * character.maxRotation) / slowRadius
  }
  targetRotationSpeed *= direction / distance // restore rotation sign
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
