import {
  angle,
  clamp,
  fromAngle,
  ZERO_VECTOR,
} from '@ezpz/utils/math/linear-algebra/vector'
import { sum } from '@ezpz/utils/math/linear-algebra/vectors'
import { abs } from '@ezpz/utils/math/numbers'

const X = 0
const Z = 2
const NO_Y = 0

export function bounce(instance, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = instance.position

  if (x < minX || x >= maxX) {
    instance.velocity[X] = -instance.velocity[X]
  }

  if (z < minZ || z >= maxZ) {
    instance.velocity[Z] = -instance.velocity[Z]
  }

  instance.position = sum(instance.position, instance.velocity)
  instance.orientation = angle(instance.velocity)
}

export function clampToBounds(instance, [minX, minZ, maxX, maxZ]) {
  instance.position = clamp(
    instance.position,
    [minX, NO_Y, minZ],
    [maxX, NO_Y, maxZ]
  )
}

export function flip(instance, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = instance.position

  const direction = fromAngle(instance.orientation)

  if (x < minX || x >= maxX || z < minZ || z >= maxZ) {
    if (x < minX) {
      direction[X] = abs(direction[X])
    } else if (x >= maxX) {
      direction[X] = -abs(direction[X])
    }

    if (z < minZ) {
      direction[Z] = abs(direction[Z])
    } else if (z >= maxZ) {
      direction[Z] = -abs(direction[Z])
    }

    instance.acceleration = ZERO_VECTOR
    instance.velocity = ZERO_VECTOR
  }

  instance.orientation = angle(direction)
}
