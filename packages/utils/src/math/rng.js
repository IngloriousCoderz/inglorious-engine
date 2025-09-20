/* eslint-disable no-magic-numbers */

/**
 * Generates a random number.
 * - If no arguments are provided, returns a random float between 0 (inclusive) and 1 (exclusive).
 * - If one argument is provided, returns a random integer between 0 and the given number (inclusive).
 * - If two or more arguments are provided, returns a random integer within the specified range and step.
 * @param {number} [to] - The upper bound (inclusive) if one argument is provided.
 * @param {number} [from] - The lower bound (inclusive) if two arguments are provided.
 * @param {number} [step=1] - The step size if two or more arguments are provided.
 * @returns {number} A random number based on the provided arguments.
 */
export function random(...args) {
  let step, from, to

  if (!args.length) {
    return Math.random()
  }

  if (args.length === 1) {
    step = 1
    from = 0
    to = args[0] + 1
  }

  if (args.length > 1) {
    step = args[2] ?? 1
    from = args[0] / step
    to = (args[1] + 1) / step
  }

  return Math.floor(Math.random() * (to - from) + from) * step
}

/**
 * Generates a random binomial value.
 * The result is the difference between two random numbers.
 * @returns {number} A random binomial value.
 */
export function randomBinomial() {
  return random() - random()
}
