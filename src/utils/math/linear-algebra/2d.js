/**
 * @typedef {import('../../../types').Vector2} Vector2
 * @typedef {import('../../../types').Vector3} Vector3
 */

const NO_Y = 0 // Default Y-coordinate value for 3D vectors derived from 2D vectors.

/**
 * Converts a 2D vector [x, z] into a 3D vector [x, 0, z].
 *
 * @param {Vector2} vector - A 2D vector represented as [x, z].
 * @returns {Vector3} A 3D vector represented as [x, 0, z].
 */
export function from2D(vector) {
  const [x, z] = vector
  return [x, NO_Y, z]
}

/**
 * Converts a 3D vector [x, y, z] into a 2D vector [x, z].
 *
 * @param {Vector3} vector - A 3D vector represented as [x, y, z].
 * @returns {Vector2} A 2D vector represented as [x, z].
 */
export function to2D(vector) {
  const [x, , z] = vector
  return [x, z]
}
