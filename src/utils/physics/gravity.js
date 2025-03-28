/* eslint-disable no-magic-numbers */

const DEFAULT_OPTIONS = { dt: 0 } // Default options for the applyGravity function.
const DEFAULT_JUMP = 0 // Default maximum jump height.
const DEFAULT_LEAP = 0 // Default maximum leap distance.
const DEFAULT_SPEED = 0 // Default maximum speed.
const NO_VELOCITY = 0 // No initial velocity.
const NO_POSITION = 0 // No initial position.

/**
 * Applies gravity to an object based on its current velocity and position.
 *
 * @see https://youtu.be/hG9SzQxaCm8
 *
 * Projectile equations:
 * 1. a(t) = g
 * 2. v(t) = g*t + v_0
 * 3. y(t) = 1/2*g*t^2 + v_0*t + y_0
 *
 * Known values:
 * 1. y_0 = 0
 * 2. v(t_h) = 0 -> 2. 0 = g*t_h + v_0 -> v_0 = -g*t_h
 * 3. y_h = h -> 3. h = 1/2*g*t_h^2 (-g*t_h)*t_h = -1/2*g*t_h^2 -> g = -2*h/t_h^2
 * 4. v_0 = -g*t_h = (-2*h/t_h^2)*t_h = 2*h/t_h
 *
 * Transforming time into space:
 * 1. t_h = x_h/v_x
 * 2. v0 = 2*h/t_h = 2*h*v_x/x_h
 * 3. g = -2*h/t_h^2 = -2*h*v_x^2/x_h^2
 *
 * Euler's Integration:
 * 1. v += a * dt
 * 2. p += v * dt + 1/2 * a * dt * dt
 *
 * @param {Object} params - Parameters for gravity calculation.
 * @param {number} params.maxJump - Maximum jump height. Defaults to 0.
 * @param {number} params.maxLeap - Maximum leap distance. Defaults to 0.
 * @param {number} params.maxSpeed - Maximum speed. Defaults to 0.
 * @param {number} params.vy - Current vertical velocity. Defaults to 0.
 * @param {number} params.py - Current vertical position. Defaults to 0.
 * @param {Object} [options=DEFAULT_OPTIONS] - Additional options.
 * @param {number} options.dt - Time delta for the calculation.
 * @returns {Object} Updated acceleration, velocity, and position.
 * @throws {Error} If maxLeap is not provided.
 */
export function applyGravity(params, options = DEFAULT_OPTIONS) {
  let {
    maxJump = DEFAULT_JUMP,
    maxLeap = DEFAULT_LEAP,
    maxSpeed = DEFAULT_SPEED,
    vy = NO_VELOCITY,
    py = NO_POSITION,
  } = params

  if (!maxLeap) {
    throw new Error("Missing maxLeap")
  }

  const { dt } = options
  const ay = (-2 * maxJump * maxSpeed ** 2) / maxLeap ** 2
  vy += ay * dt
  py += vy * dt + 0.5 * ay * dt * dt

  return { ay, vy, py }
}
