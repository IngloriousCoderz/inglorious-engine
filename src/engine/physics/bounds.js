import {
  angle,
  clamp,
  createVector,
  fromAngle,
  multiply,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"
import { sum } from "@inglorious/utils/math/linear-algebra/vectors.js"
import { abs } from "@inglorious/utils/math/numbers.js"

const X = 0
const Z = 2

export function bounce(entity, dt, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = entity.position

  const velocity = createVector(entity.maxSpeed, entity.orientation)
  if (x < minX || x >= maxX) {
    velocity[X] = -velocity[X]
  }

  if (z < minZ || z >= maxZ) {
    velocity[Z] = -velocity[Z]
  }

  const position = sum(entity.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}

// TODO: make the following functions pure
export function clampToBounds(entity, [minX, minZ, maxX, maxZ]) {
  entity.position = clamp(
    entity.position,
    [minX, minZ, minZ],
    [maxX, maxZ, maxZ],
  )
}

export function flip(entity, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = entity.position

  const direction = fromAngle(entity.orientation)

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

    entity.acceleration = zero()
    entity.velocity = zero()
  }

  entity.orientation = angle(direction)
}
