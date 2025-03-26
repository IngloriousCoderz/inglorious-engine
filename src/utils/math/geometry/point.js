/* eslint-disable no-magic-numbers */

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

  return (x - left) ** 2 + (y - top) ** 2 + (z - front) ** 2 <= radius ** 2
}

export function intersectsRectangle(point, rectangle) {
  const [x, y, z] = point
  const [left, top, front] = rectangle.position
  const [width, height, depth] = rectangle.size

  return (
    x >= left - width / 2 &&
    x <= left + width / 2 &&
    y >= top - height / 2 &&
    y <= top + height / 2 &&
    z >= front - depth / 2 &&
    z <= front + depth / 2
  )
}
