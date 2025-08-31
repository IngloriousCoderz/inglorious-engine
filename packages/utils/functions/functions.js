/**
 * Composes multiple functions from right to left, as if every function wraps the next one.
 *
 * @param {...Function} fns - Functions to compose.
 * @returns {Function} A function that takes an initial value and applies the composed functions.
 */
export function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x)
}

/**
 * Pipes multiple functions from left to right, as if the functions are applied one by one.
 *
 * @param {...Function} fns - Functions to pipe.
 * @returns {Function} A function that takes an initial value and applies the piped functions.
 */
export function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x)
}
