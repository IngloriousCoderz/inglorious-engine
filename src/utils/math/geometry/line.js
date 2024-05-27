import { hypothenuse } from '@inglorious/utils/math/geometry/triangle.js'
import { abs } from '@inglorious/utils/math/numbers.js'

function getCoefficients(line) {
  const [x1, , z1] = line.from
  const [x2, , z2] = line.to
  return [x2 - x1, z1 - z2, (x1 - x2) * z1 + x1 * (z2 - z1)]
}

// @see https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
export function intersectsCircle(line, circle) {
  const [a, b, c] = getCoefficients(line)
  const [x, , z] = circle.position

  return abs(a * x + b * z + c) / hypothenuse(a, b) <= circle.radius
}
