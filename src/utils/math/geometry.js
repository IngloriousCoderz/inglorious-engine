/* eslint-disable no-magic-numbers */

export function hypothenuse(...nums) {
  return nums.reduce((acc, num) => acc + num ** 2, 0) ** 0.5
}

export const pythagoras = hypothenuse

export function isPointInCircle(point, circle) {
  const [x, , z] = point
  const [left, , top] = circle.position
  const radius = circle.radius

  return (x - left) ** 2 + (z - top) ** 2 <= radius ** 2
}

export function isPointInRectangle(point, rectangle) {
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
