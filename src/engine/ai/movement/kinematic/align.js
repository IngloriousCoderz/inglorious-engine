import { abs, clamp } from '@ezpz/utils/math/numbers'
import { toRange } from '@ezpz/utils/math/trigonometry'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 1

export default function align(
  instance,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const direction = toRange(target.orientation - instance.orientation)
  const distance = abs(direction)

  if (distance < targetRadius) {
    return instance
  }

  let angularVelocity = direction / timeToTarget
  angularVelocity = clamp(
    angularVelocity,
    -instance.maxAngularSpeed * elapsed,
    instance.maxAngularSpeed * elapsed
  )

  const orientation = instance.orientation + angularVelocity

  return { orientation }
}
