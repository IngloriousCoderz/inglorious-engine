/**
 * @typedef {import('./types').Vector2} Vector2
 * @typedef {import('./types').Vector3} Vector3
 */

import { hypothenuse } from "../geometry/triangle.js"
import {
  abs as nAbs,
  clamp as nClamp,
  mod as nMod,
  snap as nSnap,
} from "../numbers.js"
import { atan2, cos, sin } from "../trigonometry.js"
import { from2D, to2D } from "./2d.js"
import { quaternion } from "./quaternion.js"
import { cross, sum } from "./vectors.js"

const ZERO_VECTOR = [0, 0, 0] // eslint-disable-line no-magic-numbers
const UNIT_VECTOR = [1, 0, 0] // eslint-disable-line no-magic-numbers

const X = 0
const Y = 1
const Z = 2
const LAST_COORDINATE = 1
const TWO_COORDINATES = 2
const NO_Y = 0
const DEFAULT_PRECISION = 1
const DEFAULT_DECIMALS = 0

/**
 * Returns the absolute value of each component in the vector.
 * @param {Vector3} vector - The input vector.
 * @returns {Vector3} The vector with absolute values.
 */
export function abs(vector) {
  return vector.map(nAbs)
}

/**
 * Calculates the angle of the vector in radians.
 * @param {Vector3} vector - The input vector.
 * @returns {number} The angle in radians.
 */
export function angle(vector) {
  return atan2(vector[vector.length - LAST_COORDINATE], vector[X])
}

/**
 * Clamps the magnitude of the vector between the given min and max values.
 * @param {Vector3} vector - The input vector.
 * @param {number} min - The minimum magnitude.
 * @param {number} max - The maximum magnitude.
 * @returns {Vector3} The clamped vector.
 */
export function clamp(vector, min, max) {
  const length = magnitude(vector)

  if (typeof min === "number" && length < min) {
    return setMagnitude(vector, min)
  }

  if (typeof max === "number" && length > max) {
    return setMagnitude(vector, max)
  }

  if (typeof min !== "number" && typeof max !== "number") {
    return vector.map((coordinate, index) =>
      nClamp(coordinate, min[index], max[index]),
    )
  }

  return vector
}

/**
 * Returns the conjugate of the vector.
 * @param {Vector3} vector - The input vector.
 * @returns {Vector3} The conjugated vector.
 */
export function conjugate(vector) {
  return vector.map((coordinate, index) => (index ? -coordinate : coordinate))
}

/**
 * Creates a vector with the given magnitude and angle.
 * @param {number} magnitude - The magnitude of the vector.
 * @param {number} angle - The angle of the vector in radians.
 * @returns {Vector3} The created vector.
 */
export function createVector(magnitude, angle) {
  return multiply(fromAngle(angle), magnitude)
}

/**
 * Divides each component of the vector by the given scalar.
 * @param {Vector3} vector - The input vector.
 * @param {number} scalar - The scalar value.
 * @returns {Vector3} The resulting vector.
 */
export function divide(vector, scalar) {
  return vector.map((coordinate) => coordinate / scalar)
}

/**
 * Creates a unit vector from the given angle.
 * @param {number} angle - The angle in radians.
 * @returns {Vector3} The unit vector.
 */
export function fromAngle(angle) {
  return rotate(UNIT_VECTOR, angle)
}

export const length = magnitude

/**
 * Calculates the magnitude of the vector.
 * @param {Vector3} vector - The input vector.
 * @returns {number} The magnitude of the vector.
 */
export function magnitude(vector) {
  return hypothenuse(...vector)
}

/**
 * Calculates the modulus of each component in the vector with the given divisor.
 * @param {Vector3} vector - The input vector.
 * @param {number} divisor - The divisor value.
 * @returns {Vector3} The resulting vector.
 */
export function mod(vector, divisor) {
  return vector.map((coordinate) => nMod(coordinate, divisor))
}

/**
 * Multiplies each component of the vector by the given scalar.
 * @param {Vector3} vector - The input vector.
 * @param {number} scalar - The scalar value.
 * @returns {Vector3} The resulting vector.
 */
export function multiply(vector, scalar) {
  return vector.map((coordinate) => coordinate * scalar)
}

/**
 * Normalizes the vector to have a magnitude of 1.
 * @param {Vector3} vector - The input vector.
 * @returns {Vector3} The normalized vector.
 */
export function normalize(vector) {
  const length = magnitude(vector)
  return vector.map((coordinate) => coordinate / length)
}

export const remainder = mod

/**
 * Rotates the vector by the given angle.
 * @param {Vector3} vector - The input vector.
 * @param {number} angle - The angle in radians.
 * @returns {Vector3} The rotated vector.
 */
export function rotate(vector, angle) {
  const is2D = vector.length === TWO_COORDINATES

  let v = is2D ? from2D(vector) : vector

  let result = rotateWithQuaternion(v, angle)

  return is2D ? to2D(result) : result
}

/**
 * Sets the angle of the vector while maintaining its magnitude.
 * @param {Vector3} vector - The input vector.
 * @param {number} angle - The new angle in radians.
 * @returns {Vector3} The vector with the updated angle.
 */
export function setAngle(vector, angle) {
  const length = magnitude(vector)
  const [x, z] = toCartesian([length, angle])
  return [x, NO_Y, z]
}

export const setLength = setMagnitude

/**
 * Sets the magnitude of the vector while maintaining its direction.
 * @param {Vector3} vector - The input vector.
 * @param {number} length - The new magnitude.
 * @returns {Vector3} The vector with the updated magnitude.
 */
export function setMagnitude(vector, length) {
  const normalized = normalize(vector)
  return multiply(normalized, length)
}

/**
 * Shifts the components of the vector by the given index.
 * @param {Vector3} vector - The input vector.
 * @param {number} index - The index to shift by.
 * @returns {Vector3} The shifted vector.
 */
export function shift(vector, index) {
  return [...vector.slice(index), ...vector.slice(X, index)]
}

/**
 * Snaps each component of the vector to the nearest multiple of the given precision.
 * @param {Vector3} vector - The input vector.
 * @param {number} [precision=DEFAULT_PRECISION] - The precision value.
 * @returns {Vector3} The snapped vector.
 */
export function snap(vector, precision = DEFAULT_PRECISION) {
  return vector.map((coordinate) => nSnap(coordinate, -precision, precision))
}

export const times = multiply

/**
 * Converts polar coordinates to Cartesian coordinates.
 * @param {Vector2} vector - The polar coordinates [magnitude, angle].
 * @returns {Vector2} The Cartesian coordinates [x, y].
 */
export function toCartesian([magnitude, angle]) {
  return [magnitude * cos(angle), magnitude * sin(angle)]
}

/**
 * Converts a vector to cylindrical coordinates.
 * @param {Vector2} vector - The input vector.
 * @returns {Vector2} The cylindrical coordinates [radius, theta, z].
 */
export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * cos(theta), radius * sin(theta), vector[Z]]
}

/**
 * Converts a vector to polar coordinates.
 * @param {Vector2} vector - The input vector.
 * @returns {Vector2} The polar coordinates [magnitude, angle].
 */
export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

/**
 * Converts a vector to a string representation.
 * @param {Vector3} vector - The input vector.
 * @param {number} [decimals=DEFAULT_DECIMALS] - The number of decimal places.
 * @returns {string} The string representation of the vector.
 */
export function toString(vector, decimals = DEFAULT_DECIMALS) {
  return `[${vector
    .map((coordinate) => coordinate.toFixed(decimals))
    .join(", ")}]`
}

// TODO: add toSpherical(vector),

/**
 * Converts a 3D cartesian vector to spherical coordinates [radius, inclination, azimuth].
 * - radius (r): distance from the origin.
 * - inclination (θ): angle from the Y-axis (0 to PI).
 * - azimuth (φ): angle from the X-axis in the XZ-plane (-PI to PI).
 *
 * @param {Vector3} vector The cartesian vector [x, y, z].
 * @returns {Vector3} The spherical coordinates [r, θ, φ].
 */
export function toSpherical(vector) {
  const r = magnitude(vector)

  if (!r) {
    return zero()
  }

  // In a Y-up system, inclination is the angle with the Y axis.
  const inclination = Math.acos(vector[Y] / r)
  // Azimuth is the angle in the XZ plane, which `angle()` calculates.
  const azimuth = angle(vector)

  return [r, inclination, azimuth]
}

/**
 * Creates a unit vector with the given angle.
 * @param {number} angle - The angle in radians.
 * @returns {Vector3} The unit vector.
 */
export function unit(angle) {
  if (!angle) {
    return [...UNIT_VECTOR]
  }

  return setAngle(UNIT_VECTOR, angle)
}

/**
 * Creates a zero vector.
 * @returns {Vector3} The zero vector.
 */
export function zero() {
  return [...ZERO_VECTOR]
}

/**
 * Rotates the vector using a quaternion.
 * @param {Vector3} vector - The input vector.
 * @param {number} angle - The angle in radians.
 * @returns {Vector3} The rotated vector.
 */
function rotateWithQuaternion(vector, angle) {
  if (!angle) {
    return vector
  }

  // @see https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation#Performance_comparisons
  const [w, ...r] = quaternion(angle)
  const result = sum(
    vector,
    cross(multiply(r, 2), sum(cross(r, vector), multiply(vector, w))), // eslint-disable-line no-magic-numbers
  )

  return conjugate(result) // HACK: not really sure why I should invert the result, it just works this way
}
