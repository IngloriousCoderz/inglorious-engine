import {
  angle,
  clamp,
  createVector,
  fromAngle,
  multiply,
  zero,
} from '@inglorious/utils/math/linear-algebra/vector.js'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors.js'
import { abs } from '@inglorious/utils/math/numbers.js'

const X = 0
const Z = 2
const NO_Y = 0

export function bounce(instance, { dt, config }) {
  const [minX, minZ, maxX, maxZ] = config.bounds
  const [x, , z] = instance.position

  const velocity = createVector(instance.maxSpeed, instance.orientation)
  if (x < minX || x >= maxX) {
    velocity[X] = -velocity[X]
  }

  if (z < minZ || z >= maxZ) {
    velocity[Z] = -velocity[Z]
  }

  const position = sum(instance.position, multiply(velocity, dt))
  const orientation = angle(velocity)

  return { velocity, position, orientation }
}

// TODO: make the following functions pure
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

    instance.acceleration = zero()
    instance.velocity = zero()
  }

  instance.orientation = angle(direction)
}
