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
const HALF = 2

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

const ClampToBoundsByShape = {
  rectangle(entity, [minX, minZ, maxX, maxZ], collisionGroup) {
    const [width, height, depth] =
      entity.collisions[collisionGroup].size ?? entity.size

    const halfWidth = width / HALF
    const halfHeight = height / HALF
    const halfDepth = depth / HALF

    return clamp(
      entity.position,
      [minX + halfWidth, minZ + halfHeight, minZ + halfDepth],
      [maxX - halfWidth, maxZ - halfHeight, maxZ - halfDepth],
    )
  },

  circle(entity, [minX, minY, maxX, maxY], collisionGroup, depthAxis = "y") {
    const radius = entity.collisions[collisionGroup].radius ?? entity.radius

    if (depthAxis === "z") {
      return clamp(
        entity.position,
        [minX + radius, minY + radius, minY],
        [maxX - radius, maxY - radius, maxY],
      )
    }

    return clamp(
      entity.position,
      [minX + radius, minY, minY + radius],
      [maxX - radius, maxY, maxY - radius],
    )
  },

  point(entity, [minX, minZ, maxX, maxZ]) {
    return clamp(entity.position, [minX, minZ, minZ], [maxX, maxZ, maxZ])
  },
}

export function clampToBounds(
  entity,
  bounds,
  collisionGroup = "bounds",
  depthAxis,
) {
  const shape = entity.collisions[collisionGroup].shape || "rectangle"
  const handler = ClampToBoundsByShape[shape] || ClampToBoundsByShape.point
  return handler(entity, bounds, collisionGroup, depthAxis)
}

export function flip(entity, [minX, minZ, maxX, maxZ]) {
  const [x, , z] = entity.position
  const [width, height, depth] = entity.size
  const rectHeight = height + depth
  const halfWidth = width / HALF
  const halfHeight = rectHeight / HALF

  const direction = fromAngle(entity.orientation)

  if (
    x - halfWidth < minX ||
    x + halfWidth >= maxX ||
    z - halfHeight < minZ ||
    z + halfHeight >= maxZ
  ) {
    if (x - halfWidth < minX) {
      direction[X] = abs(direction[X])
    } else if (x + halfWidth >= maxX) {
      direction[X] = -abs(direction[X])
    }

    if (z - halfHeight < minZ) {
      direction[Z] = abs(direction[Z])
    } else if (z + halfHeight >= maxZ) {
      direction[Z] = -abs(direction[Z])
    }

    entity.acceleration = zero()
    entity.velocity = zero()
  }

  entity.orientation = angle(direction)
}
