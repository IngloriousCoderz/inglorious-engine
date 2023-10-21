import { abs, clamp } from '@inglorious/utils/math/numbers'
import { toRange } from '@inglorious/utils/math/trigonometry'

export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 0.1

const DEFAULT_MAX_ROTATION = 0
const DEFAULT_MAX_ANGULAR_ACCELERATION = 0

const DEFAULT_ANGULAR_SPEED = 0
const DEFAULT_ORIENTATION = 0

export default function align(
  instance,
  target,
  {
    dt,
    targetRadius = DEFAULT_TARGET_RADIUS,
    slowRadius = DEFAULT_SLOW_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const maxAngularAcceleration =
    instance.maxAngularAcceleration ?? DEFAULT_MAX_ANGULAR_ACCELERATION
  const maxRotation = instance.maxRotation ?? DEFAULT_MAX_ROTATION

  let angularSpeed = instance.angularSpeed ?? DEFAULT_ANGULAR_SPEED
  let orientation = instance.orientation ?? DEFAULT_ORIENTATION

  const direction = toRange(target.orientation - orientation)
  const distance = abs(direction)

  if (distance < targetRadius) {
    return instance
  }

  let targetAngularSpeed
  if (distance > slowRadius) {
    targetAngularSpeed = maxRotation
  } else {
    targetAngularSpeed = (distance * maxRotation) / slowRadius
  }
  targetAngularSpeed *= direction / distance // restore rotation sign

  const angularSpeedDelta = targetAngularSpeed - angularSpeed

  let angularAcceleration = angularSpeedDelta / timeToTarget
  angularAcceleration = clamp(
    angularAcceleration,
    -maxAngularAcceleration,
    maxAngularAcceleration
  )

  angularSpeed += angularAcceleration * dt
  orientation += angularSpeed * dt

  return { angularSpeed, orientation }
}
