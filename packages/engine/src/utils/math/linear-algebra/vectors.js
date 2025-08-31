/**
 * @typedef {import('./types').Vector2} Vector2
 * @typedef {import('./types').Vector3} Vector3
 * @typedef {import('./types').Vector7} Vector7
 */

import { magnitude, shift } from "./vector.js"

/**
 * Alias for the sum function.
 * @type {typeof sum}
 */
export const add = sum

/**
 * Computes the cross product of multiple vectors.
 * @param {...Vector3 | Vector7} vectors - The vectors to compute the cross product for.
 * @returns {Vector3 | Vector7} The resulting vector after the cross product.
 */
export function cross(...vectors) {
  return vectors.reduce(crossMultiplyCoordinates)
}

/**
 * Computes the distance between multiple vectors.
 * @param {...Vector2 | Vector3} vectors - The vectors to compute the distance between.
 * @returns {number} The distance between the vectors.
 */
export function distance(...vectors) {
  return magnitude(subtract(...vectors))
}

/**
 * Computes the dot product of multiple vectors.
 * @param {...Vector2 | Vector3} vectors - The vectors to compute the dot product for.
 * @returns {number} The resulting scalar value of the dot product.
 */
export function dot(...vectors) {
  return vectors
    .reduce(dotMultiplyCoordinates)
    .reduce((coord1, coord2) => coord1 + coord2)
}

/**
 * Alias for the dot product function.
 * @type {typeof dot}
 */
export const scalarProduct = dot

/**
 * Subtracts multiple vectors.
 * @param {...Vector2 | Vector3} vectors - The vectors to subtract.
 * @returns {Vector2 | Vector3} The resulting vector after subtraction.
 */
export function subtract(...vectors) {
  return vectors.reduce(subtractCoordinates)
}

/**
 * Sums multiple vectors.
 * @param {...Vector2 | Vector3} vectors - The vectors to sum.
 * @returns {Vector2 | Vector3} The resulting vector after summation.
 */
export function sum(...vectors) {
  return vectors.reduce(sumCoordinates)
}

/**
 * Alias for the cross product function.
 * @type {typeof cross}
 */
export const vectorProduct = cross

/**
 * Adds the coordinates of two vectors.
 * @param {Vector2 | Vector3} vector1 - The first vector.
 * @param {Vector2 | Vector3} vector2 - The second vector.
 * @returns {Vector2 | Vector3} The resulting vector after addition.
 */
function sumCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate + vector2[index])
}

/**
 * Subtracts the coordinates of two vectors.
 * @param {Vector2 | Vector3} vector1 - The first vector.
 * @param {Vector2 | Vector3} vector2 - The second vector.
 * @returns {Vector2 | Vector3} The resulting vector after subtraction.
 */
function subtractCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate - vector2[index])
}

/**
 * Computes the cross product of two vectors' coordinates.
 * @param {Vector3} vector1 - The first vector.
 * @param {Vector3} vector2 - The second vector.
 * @returns {Vector3} The resulting vector after the cross product.
 */
function crossMultiplyCoordinates(vector1, vector2) {
  const indexes = Array(vector1.length)
    .fill(null)
    .map((_, index) => index)

  return indexes.map((_, index) => {
    const [index1, index2] = shift(
      indexes.filter((_, i) => i !== index),
      index,
    )
    return vector1[index1] * vector2[index2] - vector1[index2] * vector2[index1]
  })
}

/**
 * Multiplies the coordinates of two vectors.
 * @param {Vector2 | Vector3} vector1 - The first vector.
 * @param {Vector2 | Vector3} vector2 - The second vector.
 * @returns {Vector2 | Vector3} The resulting vector containing multiplied coordinates.
 */
function dotMultiplyCoordinates(vector1, vector2) {
  return vector1.map((coordinate, index) => coordinate * vector2[index])
}
