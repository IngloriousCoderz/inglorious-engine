/**
 * @typedef {import('./types').Quaternion} Quaternion
 */

import { times } from "./vector.js"
import { cross, dot, sum } from "./vectors.js"

/**
 * Combines two quaternions using the Hamilton product.
 *
 * @param {Quaternion} q1 - The first quaternion.
 * @param {Quaternion} q2 - The second quaternion.
 * @returns {Quaternion} - The resulting quaternion after combining q1 and q2.
 */
export function combine(q1, q2) {
  const [s, ...v] = q1
  const [t, ...w] = q2

  return [s * t - dot(v, w), ...sum(times(w, s), times(v, t), cross(v, w))]
}
