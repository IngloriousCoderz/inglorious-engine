import {
  magnitude,
  multiply,
  normalize,
} from '@inglorious/utils/math/linear-algebra/vector.js'
import {
  distance,
  dot,
  subtract,
} from '@inglorious/utils/math/linear-algebra/vectors.js'

const BEFORE_SEGMENT = 0

export function coefficients(segment) {
  const [x1, , z1] = segment.from
  const [x2, , z2] = segment.to
  return [z1 - z2, x2 - x1, (x1 - x2) * z1 + x1 * (z2 - z1)]
}

export function distanceFromPoint(segment, point) {
  const shiftedSegment = subtract(segment.to, segment.from)
  const shiftedPoint = subtract(point, segment.from)

  const projectionLength =
    dot(shiftedSegment, shiftedPoint) / magnitude(shiftedSegment)

  // if (point[0] === 1 && point[2] === 1) {
  //   console.log(segment, point, projectionLength, magnitude(shiftedSegment))
  // }

  if (projectionLength < BEFORE_SEGMENT) {
    return distance(point, segment.from)
  }

  if (projectionLength > magnitude(shiftedSegment)) {
    return distance(point, segment.to)
  }

  const projectedPoint = multiply(normalize(shiftedSegment), projectionLength)
  return distance(shiftedPoint, projectedPoint)
}

// @see https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
export function intersectsCircle(segment, circle) {
  return distanceFromPoint(segment, circle.position) <= circle.radius
}
