import {
  magnitude,
  setMagnitude,
} from '@inglorious/utils/math/linear-algebra/vector.js'
import {
  distance,
  dot,
  subtract,
  sum,
} from '@inglorious/utils/math/linear-algebra/vectors.js'

const BEFORE_SEGMENT = 0

export function coefficients(segment) {
  const [x1, , z1] = segment.from
  const [x2, , z2] = segment.to
  return [z1 - z2, x2 - x1, (x1 - x2) * z1 + x1 * (z2 - z1)]
}

export function closestPoint(segment, point) {
  const shiftedSegment = subtract(segment.to, segment.from)
  const shiftedPoint = subtract(point, segment.from)

  const projectionLength =
    dot(shiftedSegment, shiftedPoint) / magnitude(shiftedSegment)

  if (projectionLength < BEFORE_SEGMENT) {
    return segment.from
  }

  if (projectionLength > magnitude(shiftedSegment)) {
    return segment.to
  }

  const projectedPoint = setMagnitude(shiftedSegment, projectionLength)
  return sum(segment.from, projectedPoint)
}

export function distanceFromPoint(segment, point) {
  const closest = closestPoint(segment, point)
  return distance(point, closest)
}

// @see https://math.stackexchange.com/questions/275529/check-if-line-intersects-with-circles-perimeter
export function intersectsCircle(segment, circle) {
  return distanceFromPoint(segment, circle.position) <= circle.radius
}
