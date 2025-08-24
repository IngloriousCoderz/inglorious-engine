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
export function findCollision(entity, entities, collisionGroup = "hitbox") {
  const otherEntities = filter(
    entities,
    (id, { collisions }) => id !== entity.id && collisions?.[collisionGroup],
  )

  return Object.values(otherEntities)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((target) => collidesWith(entity, target, collisionGroup))
}

export function collidesWith(entity, target, collisionGroup = "hitbox") {
  const entityShape = getCollisionShape(entity, collisionGroup)
  const targetShape = getCollisionShape(target, collisionGroup)

  if (!entityShape || !targetShape) {
    return false
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
  const entityShape = getCollisionShape(entity, collisionGroup)
  const targetShape = getCollisionShape(target, collisionGroup)

  if (!entityShape || !targetShape) {
    return false
  }

  const shapeFns = Shape[entityShape.shape]
  if (!shapeFns || !shapeFns.findCollisions) {
    return false
  }

  return shapeFns.findCollisions(entityShape, targetShape)
}

/**
 * Correctly calculates the absolute position and size of an entity's
 * collision shape, including any offsets.
 */
function getCollisionShape(entity, collisionGroup = "hitbox") {
  const collision = entity.collisions[collisionGroup]
  if (!collision) {
    return null
  }

  const position = add(
    entity.position,
    collision.offset ?? zero(),
    entity.offset ?? zero(),
  )

  return {
    ...collision,
    position,
    size: collision.size ?? entity.size,
    radius: collision.radius ?? entity.radius,
  }
}
