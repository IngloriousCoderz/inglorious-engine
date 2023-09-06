import {
  angle,
  clamp,
  divide,
  magnitude,
  setAngle,
  setMagnitude,
  subtract,
  sum,
  toCartesian,
  toRotation,
} from '../../../utils/vectors'

export const DEFAULT_MAX_ANGULAR_ACCELERATION = 1
export const DEFAULT_TARGET_RADIUS = 1
export const DEFAULT_SLOW_RADIUS = 100
export const DEFAULT_TIME_TO_TARGET = 0.1

const UNIT_VECTOR = [1, 0, 0]
const MIN_ACCELERATION = 0

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
  const targetOrientation = setAngle(UNIT_VECTOR, target.orientation)
  const characterOrientation = setAngle(UNIT_VECTOR, character.orientation)

  const orientationDelta = subtract(targetOrientation, characterOrientation)
  const rotation = toRotation(orientationDelta)
  const radius = magnitude(rotation)

  if (radius < targetRadius) {
    return character
  }

  let targetRotationLength
  if (radius > slowRadius) {
    targetRotationLength = character.maxRotation
  } else {
    targetRotationLength = (radius * character.maxRotation) / slowRadius
  }

  // targetRotation *= rotation / radius // ???
  const targetRotation = setMagnitude(rotation, targetRotationLength * elapsed)

  const accelerationDelta = subtract(targetRotation, characterOrientation)

  let acceleration = divide(accelerationDelta, timeToTarget)
  acceleration = clamp(
    acceleration,
    MIN_ACCELERATION,
    character.maxAcceleration * elapsed
  )
  // const angularAcceleration = magnitude(acceleration)
  // if (angularAcceleration > maxAngularAcceleration) {
  //   acceleration = divide(acceleration, angularAcceleration)
  //   acceleration = mulitply(acceleration, maxAngularAcceleration)
  // }

  // const acceleration = setMagnitude(
  //   direction,
  //   character.maxAcceleration * elapsed
  // )

  // const velocity = sum(character.velocity, acceleration)
  // const position = sum(character.position, velocity)
  const orientation = angle(acceleration)

  return { orientation }
}
