/**
 * @typedef {import('@inglorious/utils/math/linear-algebra/types').Vector3} Vector3
 */

import {
  magnitude,
  setMagnitude,
  zero,
} from "@inglorious/utils/math/linear-algebra/vector.js"

const DEFAULT_OPTIONS = { dt: 0 } // Default options for the applyFriction function.
const NO_FRICTION = 0 // No friction constant.

/**
 * Applies friction to a given velocity vector.
 *
 * @param {Object} params - The parameters for the function.
 * @param {Vector3} params.velocity - The velocity vector. Defaults to a zero vector.
 * @param {number} params.friction - The friction coefficient. Defaults to 0.
 * @param {Object} [options=DEFAULT_OPTIONS] - Additional options.
 * @param {number} options.dt - The time delta for the calculation. Defaults to 0.
 * @returns {Vector3} - The updated velocity vector after applying friction.
 */
export function applyFriction(params, options = DEFAULT_OPTIONS) {
  let { velocity = zero(), friction = NO_FRICTION } = params
  const { dt } = options
  const length = magnitude(velocity)

  return length ? setMagnitude(velocity, length - friction * dt) : velocity
}
