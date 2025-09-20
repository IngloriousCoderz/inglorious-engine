/**
 * @typedef {import("./types").Point} Point
 * @typedef {import("./types").Line} Line
 * @typedef {import("./types").Circle} Circle
 * @typedef {import("./types").Rectangle} Rectangle
 */

const SQUARED = 2
const HALF = 2

import { isVector } from "../linear-algebra/vector.js"
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
  const [x1, y1, z1] = ensurePoint(point1)
  const [x2, y2, z2] = ensurePoint(point2)
  return x1 === x2 && y1 === y2 && z1 === z2
}

/**
 * Checks if a point intersects with a circle.
 * @param {Point} point - The point as a 3D coordinate [x, y, z].
 * @param {Circle} circle - The circle with a position and radius.
 * @returns {boolean} True if the point intersects the circle, false otherwise.
 */
export function intersectsCircle(point, circle) {
  const [x, y, z] = ensurePoint(point)
  const [cx, cy, cz] = circle.position
  const radius = circle.radius

  return (
    (x - cx) ** SQUARED + (y - cy) ** SQUARED + (z - cz) ** SQUARED <=
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
  const [x, y, z] = ensurePoint(point)
  const [rectX, rectY, rectZ] = rectangle.position
  const [width, height, depth] = rectangle.size

  const left = rectX - width / HALF
  const right = rectX + width / HALF
  const bottom = rectY - height / HALF
  const top = rectY + height / HALF
  const back = rectZ - depth / HALF
  const front = rectZ + depth / HALF

  return (
    x >= left &&
    x <= right &&
    y >= bottom &&
    y <= top &&
    z >= back &&
    z <= front
  )
}

function ensurePoint(value) {
  if (!isVector(value)) {
    return value.position
  }

  return value
}
