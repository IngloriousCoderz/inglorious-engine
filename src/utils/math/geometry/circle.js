/**
 * @typedef {import("./types").Point} Point
 * @typedef {import("./types").Circle} Circle
 * @typedef {import("./types").Rectangle} Rectangle
 * @typedef {import("./types").Platform} Platform
 */

import { subtract } from "@inglorious/utils/math/linear-algebra/vectors.js"

import { clamp } from "../numbers.js"
import { intersectsCircle as platformIntersectsCircle } from "./platform.js"
import {
  intersectsCircle as pointIntersectsCircle,
  intersectsRectangle as pointIntersectsRectangle,
} from "./point.js"
import { intersectsCircle as segmentIntersectsCircle } from "./segment.js"
import { hypothenuse } from "./triangle.js"

const SQUARED = 2
const INITIAL_SUM = 0

/**
 * Checks if a circle intersects with a point.
 * @param {Circle} circle - The circle to check.
 * @param {Point} point - The point to check.
 * @returns {boolean} True if the point intersects the circle, false otherwise.
 */
export function intersectsPoint(circle, point) {
  return pointIntersectsCircle(point, circle)
}

/**
 * Checks if two circles intersect.
 * @param {Circle} circle1 - The first circle.
 * @param {Circle} circle2 - The second circle.
 * @returns {boolean} True if the circles intersect, false otherwise.
 */
export function intersectsCircle(circle1, circle2) {
  return (
    hypothenuse(...subtract(circle1.position, circle2.position)) <=
    circle1.radius + circle2.radius
  )
}

/**
 * Checks if a circle intersects with a rectangle.
 * @param {Circle} circle - The circle to check.
 * @param {Rectangle} rectangle - The rectangle to check.
 * @returns {boolean} True if the circle intersects the rectangle, false otherwise.
 */
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
    // Center
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
    segmentIntersectsCircle({ from: rbf, to: rbb }, circle) ||
    // Corners
    isCircleWithinRectangleRadius(circle, rectangle)
  )
}

/**
 * Checks if a circle intersects with a platform.
 * @param {Circle} circle - The circle to check.
 * @param {Platform} platform - The platform to check.
 * @returns {boolean} True if the circle intersects the platform, false otherwise.
 */
export function intersectsPlatform(circle, platform) {
  return platformIntersectsCircle(platform, circle)
}

function isCircleWithinRectangleRadius(circle, rectangle) {
  const [left, top, front] = rectangle.position
  const [width, height, depth] = rectangle.size

  // Find the closest point on the rectangle to the circle's center
  const [x, y, z] = circle.position
  const closestPoint = [
    clamp(x, left, left + width),
    clamp(y, top, top + height),
    clamp(z, front, front + depth),
  ]

  // Calculate the distance from the circle's center to the closest point
  const distanceSquared = subtract(circle.position, closestPoint).reduce(
    (sum, value) => sum + value ** SQUARED,
    INITIAL_SUM,
  )

  return distanceSquared <= circle.radius ** SQUARED
}
