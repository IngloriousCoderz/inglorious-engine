/**
 * Calculates the length of the hypothenuse (or magnitude) for a given set of numbers
 * using the Pythagorean theorem.
 * @param {number[]} nums - A list of numbers representing the sides of a right triangle.
 * @returns {number} The length of the hypothenuse.
 */
export function hypothenuse(...nums) {
  return Math.hypot(...nums)
}

/**
 * Alias for the `hypothenuse` function.
 *  @type {typeof hypothenuse}
 */
export const pythagoras = hypothenuse
