const SQUARED = 2
const HALF = 2

import { distanceFromPoint } from "./line.js"

export function getDistanceFromLine(point, line) {
  return distanceFromPoint(line, point)
}

export function intersectsPoint(point1, point2) {
  const [x1, y1, z1] = point1
  const [x2, y2, z2] = point2
  return x1 === x2 && y1 === y2 && z1 === z2
}

export function intersectsCircle(point, circle) {
  const [x, y, z] = point
  const [left, top, front] = circle.position
  const radius = circle.radius

  return (
    (x - left) ** SQUARED + (y - top) ** SQUARED + (z - front) ** SQUARED <=
    radius ** SQUARED
  )
}

export function intersectsRectangle(point, rectangle) {
  const [x, y, z] = point
  const [left, top, front] = rectangle.position
  const [width, height, depth] = rectangle.size

  return (
    x >= left - width / HALF &&
    x <= left + width / HALF &&
    y >= top - height / HALF &&
    y <= top + height / HALF &&
    z >= front - depth / HALF &&
    z <= front + depth / HALF
  )
}
