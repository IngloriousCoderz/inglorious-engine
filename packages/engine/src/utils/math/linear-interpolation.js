/**
 * Performs linear interpolation between two numbers.
 *
 * @param {number} a - The start value.
 * @param {number} b - The end value.
 * @param {number} t - The interpolation factor, typically in the range [0, 1].
 * @returns {number} The interpolated value.
 */
export const lerp = (a, b, t) => a + (b - a) * t
