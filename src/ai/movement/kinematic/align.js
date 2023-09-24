import { abs, clamp, toRange } from '../../../utils/maths'

export const DEFAULT_TARGET_RADIUS = 0.1
export const DEFAULT_TIME_TO_TARGET = 1

export default function align(
  character,
  target,
  {
    elapsed,
    targetRadius = DEFAULT_TARGET_RADIUS,
    timeToTarget = DEFAULT_TIME_TO_TARGET,
  }
) {
  const orientationDelta = target.orientation - character.orientation
  const radius = toRange(orientationDelta)

  if (abs(radius) < targetRadius) {
    return character
  }

  let angularVelocity = radius / timeToTarget
  angularVelocity = clamp(
    angularVelocity,
    -character.maxAngularSpeed * elapsed,
    character.maxAngularSpeed * elapsed
  )

  const orientation = character.orientation + angularVelocity

  return { orientation }
}
