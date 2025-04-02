import { filter } from "@inglorious/utils/data-structures/object.js"
import * as circle from "@inglorious/utils/math/geometry/circle.js"
import * as line from "@inglorious/utils/math/geometry/line.js"
import * as point from "@inglorious/utils/math/geometry/point.js"
import * as rectangle from "@inglorious/utils/math/geometry/rectangle.js"
import * as segment from "@inglorious/utils/math/geometry/segment.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { add } from "@inglorious/utils/math/linear-algebra/vectors.js"

const Y = 1 // Y-axis index.
const Z = 2 // Z-axis index.
const NO_JUMP = 0 // No vertical height applied.

const Shape = {
  circle,
  line,
  point,
  rectangle,
  segment,
}

/**
 * Finds the first collision between a point and a list of instances.
 *
 * @param {Point} instance - The point to check for collisions.
 * @param {Options} options - Options for collision detection.
 * @returns {Instance | undefined} The first instance that collides with the point, or undefined if none are found.
 */
export function findCollision(instance, options) {
  const { instances, collisionType = "hitbox" } = options

  const otherInstances = filter(
    instances,
    (id, { collisions }) => id !== instance.id && collisions?.[collisionType],
  )

  return Object.values(otherInstances)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((target) => collidesWith(instance, target, collisionType))
}

export function collidesWith(instance, target, collisionType = "hitbox") {
  const instanceCollision = instance.collisions[collisionType]
  const instanceShape = {
    ...instanceCollision,
    position: add(instance.position, instanceCollision.position || zero()),
    size: instanceCollision.size || instance.size,
    radius: instanceCollision.radius || instance.radius,
  }
  instanceShape.position[Y] += instance.py ?? NO_JUMP

  const targetCollision = target.collisions[collisionType]
  const targetShape = {
    ...targetCollision,
    position: add(target.position, targetCollision.position || zero()),
    size: targetCollision.size || target.size,
    radius: targetCollision.radius || target.radius,
  }
  targetShape.position[Y] += target.py ?? NO_JUMP

  return shapeCollidesWith(instanceShape, targetShape)
}

function shapeCollidesWith(instance, target) {
  const shapeFns = Shape[instance.shape]

  switch (target.shape) {
    case "point":
      return shapeFns.intersectsPoint(instance, target)

    case "circle":
      return shapeFns.intersectsCircle(instance, target)

    case "rectangle":
      return shapeFns.intersectsRectangle(instance, target)

    case "platform":
      return shapeFns.intersectsPlatform(instance, target)
  }
}
