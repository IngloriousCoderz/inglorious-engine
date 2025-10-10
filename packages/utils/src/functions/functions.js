/**
 * Composes multiple functions from right to left, as if every function wraps the next one.
 * The first function (rightmost) can take multiple arguments; the remaining functions must be unary.
 *
 * @param {...Function} fns - Functions to compose.
 * @returns {Function} A function that takes the initial arguments and applies the composed functions.
 */
export function compose(...fns) {
  if (!fns.length) {
    return (x) => x
  }

  const [last, ...rest] = fns.reverse()
  return (...args) => rest.reduce((acc, fn) => fn(acc), last(...args))
}

/**
 * Pipes multiple functions from left to right, as if the functions are applied one by one.
 * The first function (leftmost) can take multiple arguments; the remaining functions must be unary.
 *
 * @param {...Function} fns - Functions to pipe.
 * @returns {Function} A function that takes the initial arguments and applies the piped functions.
 */
export function pipe(...fns) {
  if (!fns.length) {
    return (x) => x
  }

  const [first, ...rest] = fns
  return (...args) => rest.reduce((acc, fn) => fn(acc), first(...args))
}
