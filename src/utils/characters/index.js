import { abs } from '@ezpz/utils/math/numbers'
import {
  angle,
  clamp,
  fromAngle,
  ZERO_VECTOR,
} from '@ezpz/utils/vectors/vector'
import { sum } from '@ezpz/utils/vectors/vectors'

const X = 0
const Z = 2
const NO_Y = 0

export function bounce(character, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = character.position

  if (x < minX || x >= maxX) {
    character.velocity[X] = -character.velocity[X]
  }

  if (z < minZ || z >= maxZ) {
    character.velocity[Z] = -character.velocity[Z]
  }

  character.position = sum(character.position, character.velocity)
  character.orientation = angle(character.velocity)
}

export function clampToBounds(character, [minX, minZ, maxX, maxZ]) {
  character.position = clamp(
    character.position,
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
