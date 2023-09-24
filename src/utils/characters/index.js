import { abs } from '../math'
import { angle, clamp, sum } from '../vectors'

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

  if (x < minX) {
    instance.direction[X] = abs(instance.direction[X])
  } else if (x >= maxX) {
    instance.direction[X] = -abs(instance.direction[X])
  }

  if (z < minZ) {
    instance.direction[Z] = abs(instance.direction[Z])
  } else if (z >= maxZ) {
    instance.direction[Z] = -abs(instance.direction[Z])
  }
}
