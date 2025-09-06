/**
 * Ensures that the given value is a Set. If it's not a Set, it creates one from the value.
 *
 * @param {*} value - The value to check.
 * @returns {Set} - The original Set or a new Set created from the value.
 */
export function ensureSet(value) {
  return value instanceof Set ? value : new Set(value)
}
