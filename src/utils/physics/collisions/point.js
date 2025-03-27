/**
 * @typedef {import('./types').Options} Options
 * @typedef {import('./types').Instance} Instance
 * @typedef {import('@inglorious/utils/math/geometry/types').Point} Point
 */

import {
  intersectsCircle,
  intersectsRectangle,
} from "@inglorious/utils/math/geometry/point.js"

// Z-axis index for 3D position arrays
const Z = 2

// Mapping of hitbox shapes to their respective intersection functions
const Target = {
  circle: intersectsCircle,
  rectangle: intersectsRectangle,
}

/**
 * Finds the first collision between a point and a list of instances.
 *
 * @param {Point} point - The point to check for collisions.
 * @param {Options} options - Options for collision detection.
 * @returns {Instance | undefined} The first instance that collides with the point, or undefined if none are found.
 */
export function findCollision(point, options) {
  const { types, instances } = options
  return Object.values(instances)
    .filter(({ type }) => types[type].hitbox)
    .toSorted((a, b) => a.position[Z] - b.position[Z])
    .find((instance) => collides(point, instance, options))
}

/**
 * Checks if a point collides with a specific instance.
 *
 * @param {Point} point - The point to check for collision.
 * @param {Instance} instance - The instance to check against.
 * @param {Options} options - Options for collision detection.
 * @returns {boolean} True if the point collides with the instance, false otherwise.
 */
function collides(point, instance, { types }) {
  const { hitbox } = types[instance.type]
  return Target[hitbox.shape](point, {
    ...hitbox,
    position: instance.position,
  })
}
