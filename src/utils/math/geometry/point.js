/* eslint-disable no-magic-numbers */

export function intersectsPoint(point1, point2) {
  const [x1, y1, z1] = point1
  const [x2, y2, z2] = point2
  return x1 === x2 && y1 === y2 && z1 === z2
}

export function intersectsCircle(point, circle) {
  const [x, , z] = point
  const [left, , top] = circle.position
  const radius = circle.radius

  return (x - left) ** 2 + (z - top) ** 2 <= radius ** 2
}

export function intersectsRectangle(point, rectangle) {
  const [x, , z] = point
  const [left, , top] = rectangle.position
  const [width, height] = rectangle.size

  return (
    x >= left - width / 2 &&
    x <= left + width / 2 &&
    z >= top - height / 2 &&
    z <= top + height / 2
  )
}
