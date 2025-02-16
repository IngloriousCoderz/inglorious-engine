import * as circle from '@inglorious/utils/math/geometry/circle.js'
import * as line from '@inglorious/utils/math/geometry/line.js'
import * as point from '@inglorious/utils/math/geometry/point.js'
import * as rectangle from '@inglorious/utils/math/geometry/rectangle.js'
import * as segment from '@inglorious/utils/math/geometry/segment.js'
import { add } from '@inglorious/utils/math/linear-algebra/vectors.js'

const Shape = {
  circle,
  line,
  point,
  rectangle,
  segment,
}

export function collidesWith(instance, target, type = 'hitbox') {
  const instanceCollision = instance.collisions[type]
  const instanceShape = {
    ...instanceCollision,
    position: add(instance.position, instanceCollision.position),
  }

  const targetCollision = target.collisions[type]
  const targetShape = {
    ...targetCollision,
    position: add(target.position, targetCollision.position),
  }

  return shapeCollidesWith(instanceShape, targetShape)
}

function shapeCollidesWith(instance, target) {
  const shapeFns = Shape[instance.shape]

  switch (target.shape) {
    case 'point':
      return shapeFns.intersectsPoint(instance, target)

    case 'circle':
      return shapeFns.intersectsCircle(instance, target)

    case 'rectangle':
      return shapeFns.intersectsRectangle(instance, target)

    case 'platform':
      return shapeFns.intersectsPlatform(instance, target)
  }
}
