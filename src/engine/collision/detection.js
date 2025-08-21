import { filter } from "@inglorious/utils/data-structures/object.js"
import * as circle from "@inglorious/utils/math/geometry/circle.js"
import * as hitmask from "@inglorious/utils/math/geometry/hitmask.js"
import * as line from "@inglorious/utils/math/geometry/line.js"
import * as platform from "@inglorious/utils/math/geometry/platform.js"
import * as point from "@inglorious/utils/math/geometry/point.js"
import * as rectangle from "@inglorious/utils/math/geometry/rectangle.js"
import * as segment from "@inglorious/utils/math/geometry/segment.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { add } from "@inglorious/utils/math/linear-algebra/vectors.js"

const Z = 2 // Z-axis index.

const Shape = {
  circle,
  line,
  platform,
  point,
  rectangle,
  segment,
  hitmask,
}

/**
 * Finds the first collision between a point and a list of entities.
 *
 * @param {Point} entity - The point to check for collisions.
 * @param {Options} options - Options for collision detection.
 * @returns {Entity | undefined} The first entity that collides with the point, or undefined if none are found.
 */
export function findCollision(entity, { api, collisionGroup = "hitbox" } = {}) {
  const entities = api.getEntities()

  const otherEntities = filter(
    entities,
    (id, { collisions }) => id !== entity.id && collisions?.[collisionGroup],
  )

  return Object.values(otherEntities)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((target) => collidesWith(entity, target, collisionGroup))
}

export function collidesWith(entity, target, collisionGroup = "hitbox") {
  const entityCollision = entity.collisions[collisionGroup]
  const entityShape = {
    ...entityCollision,
    position: add(
      entity.position,
      entityCollision.offset ?? zero(),
      entity.offset ?? zero(),
    ),
    size: entityCollision.size ?? entity.size,
    radius: entityCollision.radius ?? entity.radius,
  }

  const targetCollision = target.collisions[collisionGroup]
  const targetShape = {
    ...targetCollision,
    position: add(
      target.position,
      targetCollision.offset ?? zero(),
      target.offset ?? zero(),
    ),
    size: targetCollision.size ?? target.size,
    radius: targetCollision.radius ?? target.radius,
  }

  return shapeCollidesWith(entityShape, targetShape)
}

function shapeCollidesWith(entity, target) {
  const shapeFns = Shape[entity.shape]

  switch (target.shape) {
    case "circle":
      return shapeFns.intersectsCircle(entity, target)

    case "line":
      return shapeFns.intersectsLine(entity, target)

    case "platform":
      return shapeFns.intersectsPlatform(entity, target)

    case "point":
      return shapeFns.intersectsPoint(entity, target)

    case "rectangle":
      return shapeFns.intersectsRectangle(entity, target)

    case "segment":
      return shapeFns.intersectsSegment(entity, target)
  }
}

export function findCollisions(entity, target, collisionGroup = "hitbox") {
  const entityCollision = entity.collisions[collisionGroup]
  const entityShape = {
    ...entityCollision,
    position: add(
      entity.position,
      entityCollision.offset ?? zero(),
      // entity.offset ?? zero(),
    ),
    size: entityCollision.size ?? entity.size,
    radius: entityCollision.radius ?? entity.radius,
    heights: flipUpsideDown(entityCollision.heights, entityCollision.columns),
  }

  const targetCollision = target.collisions[collisionGroup]
  const targetShape = {
    ...targetCollision,
    position: add(
      target.position,
      targetCollision.offset ?? zero(),
      // target.offset ?? zero(),
    ),
    size: targetCollision.size ?? target.size,
    radius: targetCollision.radius ?? target.radius,
  }

  const shapeFns = Shape[entityCollision.shape]
  return shapeFns.findCollisions(entityShape, targetShape)
}

export function flipUpsideDown(grid, columns) {
  const rows = []
  for (let i = 0; i < grid.length; i += columns) {
    rows.push(grid.slice(i, i + columns))
  }
  return rows.reverse().flat()
}
