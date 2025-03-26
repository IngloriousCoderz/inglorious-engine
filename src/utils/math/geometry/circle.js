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
  const [left, top, front] = rectangle.position
  const [width, height, depth] = rectangle.size

  const ltf = [left, top, front]
  const rtf = [left + width, top, front]
  const lbf = [left, top, front + depth]
  const rbf = [left + width, top, front + depth]

  const ltb = [left, top + height, front]
  const rtb = [left + width, top + height, front]
  const lbb = [left, top + height, front + depth]
  const rbb = [left + width, top + height, front + depth]

  return (
    pointIntersectsRectangle(circle.position, rectangle) ||
    // Front face
    segmentIntersectsCircle({ from: ltf, to: rtf }, circle) ||
    segmentIntersectsCircle({ from: rtf, to: rbf }, circle) ||
    segmentIntersectsCircle({ from: rbf, to: lbf }, circle) ||
    segmentIntersectsCircle({ from: lbf, to: ltf }, circle) ||
    // Back face
    segmentIntersectsCircle({ from: ltb, to: rtb }, circle) ||
    segmentIntersectsCircle({ from: rtb, to: rbb }, circle) ||
    segmentIntersectsCircle({ from: rbb, to: lbb }, circle) ||
    segmentIntersectsCircle({ from: lbb, to: ltb }, circle) ||
    // Connecting edges
    segmentIntersectsCircle({ from: ltf, to: ltb }, circle) ||
    segmentIntersectsCircle({ from: rtf, to: rtb }, circle) ||
    segmentIntersectsCircle({ from: lbf, to: lbb }, circle) ||
    segmentIntersectsCircle({ from: rbf, to: rbb }, circle)
  )
}

export function intersectsPlatform(circle, platform) {
  const [x, y, z] = circle.position

  const [left, top, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const lowestPoint = y - circle.radius
  const isAbove = lowestPoint <= top && lowestPoint >= top - elevation

  const isOverlappingX = x >= left && x <= left + extension
  const isOverlappingZ = z >= front && z <= front + thickness

  return isAbove && isOverlappingX && isOverlappingZ
}
