/**
 * @typedef {import("./types").Rectangle} Rectangle
 * @typedef {import("./types").Platform} Platform
 */

import { intersectsRectangle as circleIntersectsRectangle } from "./circle.js"
import { intersectsRectangle as platformIntersectsRectangle } from "./platform.js"

export function intersectsCircle(rectangle, circle) {
  return circleIntersectsRectangle(circle, rectangle)
}

/**
 * Determines whether a rectangle intersects another in 3D space.
 *
 * @param {Rectangle} rectangle1 - The rectangle defined by its position (x, y, z) and size (width, height, depth).
 * @param {Rectangle} rectangle2 - The other rectangle defined by its position (z, y, z) and size (width, height, depth).
 * @returns {boolean} True if the two rectangles intersect, false otherwise.
 */
export function intersectsRectangle(rectangle1, rectangle2) {
  const [x1, y1, z1] = rectangle1.position
  const [w1, h1, d1] = rectangle1.size

  const [x2, y2, z2] = rectangle2.position
  const [w2, h2, d2] = rectangle2.size

  return (
    x1 <= x2 + w2 &&
    x1 + w1 >= x2 &&
    y1 <= y2 + h2 &&
    y1 + h1 >= y2 &&
    z1 <= z2 + d2 &&
    z1 + d1 >= z2
  )
}

/**
 * Checks if a rectangle intersects with a platform.
 * @param {Rectangle} rectangle - The rectangle to check.
 * @param {Platform} platform - The platform to check.
 * @returns {boolean} True if the rectangle intersects the platform, false otherwise.
 */
export function intersectsPlatform(rectangle, platform) {
  return platformIntersectsRectangle(platform, rectangle)
}
