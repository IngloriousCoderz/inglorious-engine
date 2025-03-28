/**
 * @typedef {import("./types").Point} Point
 * @typedef {import("./types").Line} Line
 * @typedef {import("./types").Circle} Circle
 * @typedef {import("./types").Rectangle} Rectangle
 */

const SQUARED = 2
const HALF = 2

import { distanceFromPoint } from "./line.js"

/**
 * Calculates the distance from a point to a line.
 * @param {Point} point - The point as a 3D coordinate [x, y, z].
 * @param {Line} line - The line to calculate the distance from.
 * @returns {number} The distance from the point to the line.
 */
export function getDistanceFromLine(point, line) {
  return distanceFromPoint(line, point)
}

/**
 * Checks if two points intersect.
 * @param {Point} point1 - The first point as a 3D coordinate [x, y, z].
 * @param {Point} point2 - The second point as a 3D coordinate [x, y, z].
 * @returns {boolean} True if the points intersect, false otherwise.
 */
export function intersectsPoint(point1, point2) {
  const [x1, y1, z1] = point1
  const [x2, y2, z2] = point2
  return x1 === x2 && y1 === y2 && z1 === z2
}

/**
 * Checks if a point intersects with a circle.
 * @param {Point} point - The point as a 3D coordinate [x, y, z].
 * @param {Circle} circle - The circle with a position and radius.
 * @returns {boolean} True if the point intersects the circle, false otherwise.
 */
export function intersectsCircle(point, circle) {
  const [x, y, z] = point
  const [left, top, front] = circle.position
  const radius = circle.radius

  return (
    (x - left) ** SQUARED + (y - top) ** SQUARED + (z - front) ** SQUARED <=
    radius ** SQUARED
  )
}

/**
 * Checks if a point intersects with a rectangle.
 * @param {Point} point - The point as a 3D coordinate [x, y, z].
 * @param {Rectangle} rectangle - The rectangle with a position and size.
 * @returns {boolean} True if the point intersects the rectangle, false otherwise.
 */
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
