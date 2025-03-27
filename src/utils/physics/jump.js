/* eslint-disable no-magic-numbers */

const DEFAULT_OPTIONS = { dt: 0 } // Default options for the jump function.
const DEFAULT_MAX_JUMP = 0 // Default maximum jump height.
const DEFAULT_MAX_LEAP = 0 // Default maximum leap distance.
const DEFAULT_MAX_SPEED = 0 // Default maximum speed.
const DEFAULT_PY = 0 // Default initial position on the y-axis.

/**
 * Calculates the vertical velocity (vy) and updated y-axis position (py)
 * based on the provided parameters and options.
 *
 * @param {Object} params - Parameters for the jump calculation.
 * @param {number} params.maxJump - Maximum jump height. Defaults to 0.
 * @param {number} params.maxLeap - Maximum leap distance. Defaults to 0.
 * @param {number} params.maxSpeed - Maximum speed. Defaults to 0.
 * @param {number} params.py - Initial position on the y-axis. Defaults to 0.
 * @param {Object} [options=DEFAULT_OPTIONS] - Options for the jump calculation.
 * @param {number} options.dt - Delta time for the calculation. Defaults to 0.
 * @returns {Object} An object containing the vertical velocity (vy) and updated y-axis position (py).
 */
export function jump(params, options = DEFAULT_OPTIONS) {
  let {
    maxJump = DEFAULT_MAX_JUMP,
    maxLeap = DEFAULT_MAX_LEAP,
    maxSpeed = DEFAULT_MAX_SPEED,
    py = DEFAULT_PY,
  } = params
  const { dt } = options

  const vy = (2 * maxJump * maxSpeed) / maxLeap
  py += vy * dt

  return { vy, py }
}
