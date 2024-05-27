import { subtract } from '@inglorious/utils/math/linear-algebra/vectors.js'

import { intersectsCircle as lineIntersectsCircle } from './line.js'
import {
  intersectsCircle as pointIntersectsCircle,
  intersectsRectangle as pointIntersectsRectangle,
} from './point.js'
import { hypothenuse } from './triangle.js'

export function intersectsPoint(circle, point) {
  return pointIntersectsCircle(point, circle)
}

export function intersectsCircle(circle1, circle2) {
  return (
    hypothenuse(...subtract(circle1.position, circle2.position)) <=
    circle1.radius + circle2.radius
  )
}

export function intersectsRectangle(circle, rectangle) {
  const [left, y, top] = rectangle.position
  const [width, height] = rectangle.size

  const topLeft = [left, y, top]
  const topRight = [left + width, y, top]
  const bottomLeft = [left, y, top + height]
  const bottomRight = [left + width, y, top + height]

  return (
    pointIntersectsRectangle(circle.position, rectangle) ||
    lineIntersectsCircle({ from: topLeft, to: topRight }, circle) ||
    lineIntersectsCircle({ from: topRight, to: bottomRight }, circle) ||
    lineIntersectsCircle({ from: bottomRight, to: bottomLeft }, circle) ||
    lineIntersectsCircle({ from: bottomLeft, to: topLeft }, circle)
  )
}
