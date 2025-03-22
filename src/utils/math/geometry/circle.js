import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

import {
  intersectsCircle as pointIntersectsCircle,
  intersectsRectangle as pointIntersectsRectangle,
} from "./point.js"
import { intersectsCircle as segmentIntersectsCircle } from "./segment.js"
import { hypothenuse } from "./triangle.js"

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
    segmentIntersectsCircle({ from: topLeft, to: topRight }, circle) ||
    segmentIntersectsCircle({ from: topRight, to: bottomRight }, circle) ||
    segmentIntersectsCircle({ from: bottomRight, to: bottomLeft }, circle) ||
    segmentIntersectsCircle({ from: bottomLeft, to: topLeft }, circle)
  )
}

export function intersectsPlatform(circle, platform) {
  const [x, , z] = circle.position

  const [left, , top] = platform.position
  const [extension, thickness] = platform.size

  const lowestPoint = z - circle.radius
  const isAbove = lowestPoint <= top && lowestPoint >= top - thickness

  const isOverlappingX = x >= left && x <= left + extension

  return isAbove && isOverlappingX
}
