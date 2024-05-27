import { abs } from '@inglorious/utils/math/numbers.js'

import { hypothenuse } from './triangle'

export function distanceFromPoint(line, point) {
  const [a, b, c] = line
  const [x, , z] = point

  return abs(a * x + b * z + c) / hypothenuse(a, b)
}

// @see https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
export function intersectsCircle(line, circle) {
  return distanceFromPoint(line, circle.position) <= circle.radius
}
