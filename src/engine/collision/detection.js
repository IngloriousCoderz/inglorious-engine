import * as circle from "@inglorious/utils/math/geometry/circle.js"
import * as line from "@inglorious/utils/math/geometry/line.js"
import * as point from "@inglorious/utils/math/geometry/point.js"
import * as rectangle from "@inglorious/utils/math/geometry/rectangle.js"
import * as segment from "@inglorious/utils/math/geometry/segment.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { add } from "@inglorious/utils/math/linear-algebra/vectors.js"

const Y = 1
const NO_JUMP = 0

const Shape = {
  circle,
  line,
  point,
  rectangle,
  segment,
}

export function collidesWith(instance, target, type = "hitbox") {
  const instanceCollision = instance.collisions[type]
  const instanceShape = {
    ...instanceCollision,
    position: add(instance.position, instanceCollision.position || zero()),
    size: instanceCollision.size || instance.size,
    radius: instanceCollision.radius || instance.radius,
  }
  instanceShape.position[Y] += instance.py || NO_JUMP

  const targetCollision = target.collisions[type]
  const targetShape = {
    ...targetCollision,
    position: add(target.position, targetCollision.position || zero()),
    size: targetCollision.size || target.size,
    radius: targetCollision.radius || target.radius,
  }
  targetShape.position[Y] += target.py || NO_JUMP

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
