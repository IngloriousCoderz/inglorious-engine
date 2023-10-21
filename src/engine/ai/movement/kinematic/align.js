import { abs, clamp } from '@inglorious/utils/math/numbers'
import { toRange } from '@inglorious/utils/math/trigonometry'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 0.1

const DEFAULT_ORIENTATION = 0

export default function align(
  instance,
  target,
  {
    dt,
    targetRadius = DEFAULT_TARGET_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  let orientation = instance.orientation ?? DEFAULT_ORIENTATION
  const direction = toRange(target.orientation - orientation)
  const distance = abs(direction)

  if (distance < targetRadius) {
    return instance
  }

  let angularVelocity = direction / timeToTarget
  angularVelocity = clamp(
    angularVelocity,
    -instance.maxAngularSpeed * dt,
    instance.maxAngularSpeed * dt
  )

  orientation += angularVelocity

  return { orientation }
}
