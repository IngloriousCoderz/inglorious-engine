/**
 * @typedef {import('./types').Vector} Vector
 * @typedef {import('./types').Vector2} Vector2
 * @typedef {import('./types').Vector3} Vector3
 */

import { isArray } from "../../data-structures/array.js"
import { hypothenuse } from "../geometry/triangle.js"
import {
  abs as nAbs,
  clamp as nClamp,
  mod as nMod,
  snap as nSnap,
} from "../numbers.js"
import { atan2, cos, sin } from "../trigonometry.js"
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
 *
 * @param {Vector} vector - The input vector.
 * @returns {Vector} The vector with absolute values.
 */
export function abs(vector) {
  return vector.map(nAbs)
}

/**
 * Calculates the angle of the vector in radians.
 *
 * @param {Vector} vector - The input vector.
 * @returns {number} The angle of the vector in the XZ plane (for 3D) or XY plane (for 2D), in radians.
 */
export function angle(vector) {
  return atan2(vector[vector.length - LAST_COORDINATE], vector[X])
}

/**
 * Clamps the magnitude of the vector between the given min and max values.
 *
 * @param {Vector} vector - The input vector.
 * @param {number|Vector} min - The minimum magnitude or a vector representing the lower bounds for each component.
 * @param {number|Vector} max - The maximum magnitude or a vector representing the upper bounds for each component.
 * @returns {Vector} The clamped vector.
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
 *
 * @param {Vector} vector - The input vector.
 * @returns {Vector} The conjugated vector.
 */
export function conjugate(vector) {
  return vector.map((coordinate, index) => (index ? -coordinate : coordinate))
}

/**
 * Creates a 3D vector with the given magnitude and angle.
 *
 * @param {number} magnitude - The magnitude of the vector.
 * @param {number} angle - The angle of the vector in radians.
 * @returns {Vector3} The created 3D vector.
 */
export function createVector(magnitude, angle) {
  return multiply(fromAngle(angle), magnitude)
}

/**
 * Divides each component of the vector by the given scalar.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} scalar - The scalar value.
 * @returns {Vector} The resulting vector.
 */
export function divide(vector, scalar) {
  return vector.map((coordinate) => coordinate / scalar)
}

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
 * Creates a 3D unit vector from the given angle in the XZ plane.
 * @param {number} angle - The angle in radians.
 * @returns {Vector3} The unit vector.
 */
export function fromAngle(angle) {
  return rotate(UNIT_VECTOR, angle)
}

/**
 * Checks if a value is a vector.
 * A vector is an array of numbers. For performance, vectors created with `v()`
 * are tagged and can be identified more quickly.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a vector, false otherwise.
 */
export function isVector(value) {
  return (
    value?.__isVector__ ||
    (isArray(value) &&
      value.every((coordinate) => typeof coordinate === "number"))
  )
}

/**
 * Calculates the magnitude (length) of the vector.
 * Alias: `length`.
 *
 * @param {Vector} vector - The input vector.
 * @returns {number} The magnitude of the vector.
 */
export function magnitude(vector) {
  return hypothenuse(...vector)
}

export const length = magnitude

/**
 * Calculates the modulus of each component in the vector with the given divisor.
 * Alias: `remainder`.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} divisor - The divisor value.
 * @returns {Vector} The resulting vector.
 */
export function mod(vector, divisor) {
  return vector.map((coordinate) => nMod(coordinate, divisor))
}

/**
 * Multiplies each component of the vector by the given scalar.
 * Aliases: `scale`, `times`.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} scalar - The scalar value.
 * @returns {Vector} The resulting vector.
 */
export function multiply(vector, scalar) {
  return vector.map((coordinate) => coordinate * scalar)
}

export const scale = multiply

export const times = multiply

/**
 * Normalizes the vector to have a magnitude of 1.
 *
 * @param {Vector} vector - The input vector.
 * @returns {Vector} The normalized vector.
 */
export function normalize(vector) {
  const length = magnitude(vector)
  return vector.map((coordinate) => coordinate / length)
}

export const remainder = mod

/**
 * Rotates the vector by the given angle. Handles 2D and 3D vectors.
 * For 3D vectors, rotation is around the Y-axis.
 *
 * @param {Vector} vector - The input vector (2D or 3D).
 * @param {number} angle - The angle in radians.
 * @returns {Vector} The rotated vector.
 */
export function rotate(vector, angle) {
  const is2D = vector.length === TWO_COORDINATES

  let v = is2D ? from2D(vector) : vector

  let result = rotateWithQuaternion(v, angle)

  return is2D ? to2D(result) : result
}

/**
 * Sets the angle of the vector in the XZ plane while maintaining its magnitude.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} angle - The new angle in radians.
 * @returns {Vector3} The vector with the updated angle.
 */
export function setAngle(vector, angle) {
  const length = magnitude(vector)
  const [x, z] = toCartesian([length, angle])
  return [x, NO_Y, z]
}

/**
 * Sets the length of the vector while maintaining its direction. Alias of `setMagnitude`.
 * Alias: `setLength`.
 */
export const setLength = setMagnitude

/**
 * Sets the magnitude of the vector while maintaining its direction.
 * Alias: `setLength`.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} length - The new magnitude.
 * @returns {Vector} The vector with the updated magnitude.
 */
export function setMagnitude(vector, length) {
  const normalized = normalize(vector)
  return multiply(normalized, length)
}

/**
 * Shifts the components of the vector by the given index.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} index - The index to shift by.
 * @returns {Vector} The shifted vector.
 */
export function shift(vector, index) {
  return [...vector.slice(index), ...vector.slice(X, index)]
}

/**
 * Snaps each component of the vector to the nearest multiple of the given precision.
 *
 * @param {Vector} vector - The input vector.
 * @param {number} [precision=DEFAULT_PRECISION] - The precision value.
 * @returns {Vector} The snapped vector.
 */
export function snap(vector, precision = DEFAULT_PRECISION) {
  return vector.map((coordinate) => nSnap(coordinate, -precision, precision))
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

/**
 * Converts 2D polar coordinates to 2D Cartesian coordinates.
 *
 * @param {Vector2} vector - The polar coordinates [magnitude, angle].
 * @returns {Vector2} The Cartesian coordinates [x, y].
 */
export function toCartesian([magnitude, angle]) {
  return [magnitude * cos(angle), magnitude * sin(angle)]
}

/**
 * Converts a 3D cartesian vector to cylindrical coordinates.
 *
 * @param {Vector3} vector - The input vector [x, y, z].
 * @returns {Vector3} The cylindrical coordinates [radius, theta, z].
 */
export function toCylindrical(vector) {
  const radius = magnitude(vector)
  const theta = angle(vector)
  return [radius * cos(theta), radius * sin(theta), vector[Z]]
}

/**
 * Converts a 2D cartesian vector to 2D polar coordinates.
 *
 * @param {Vector2} vector - The input vector [x, y].
 * @returns {Vector2} The polar coordinates [magnitude, angle].
 */
export function toPolar(vector) {
  return [magnitude(vector), angle(vector)]
}

/**
 * Converts a vector to a string representation.
 *
 * @param {Vector} vector - The input vector.
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
 * Creates a 3D unit vector in the XZ plane with the given angle.
 *
 * @param {number} [angle=0] - The angle in radians.
 * @returns {Vector3} The unit vector.
 */
export function unit(angle) {
  if (!angle) {
    return [...UNIT_VECTOR]
  }

  return setAngle(UNIT_VECTOR, angle)
}

/**
 * A utility function to create a vector from a list of coordinates.
 * This is a shorthand for `[x, y, z, ...]`.
 * It also tags the array with a non-enumerable `__isVector__` property for
 * efficient type checking.
 *
 * @param {...number} coords - The coordinates of the vector.
 * @returns {Vector} The created vector.
 */
export function v(...coords) {
  Object.defineProperty(coords, "__isVector__", {
    value: true,
    enumerable: false,
    configurable: false,
    writable: false,
  })
  return coords
}

/**
 * Creates a zero vector of 3 dimensions.
 *
 * @returns {Vector3} The zero vector.
 */
export function zero() {
  return [...ZERO_VECTOR]
}

/**
 * Rotates a 3D vector around the Y-axis using a quaternion.
 *
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
