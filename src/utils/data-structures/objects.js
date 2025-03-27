import { isObject } from "./object.js"

/**
 * Merges multiple source objects into a destination object.
 * Performs a deep merge for nested objects and arrays.
 *
 * @param {Object} dest - The destination object to merge into.
 * @param {...Object} sources - The source objects to merge from.
 * @returns {Object} - The merged destination object.
 */
export function merge(dest, ...sources) {
  return sources
    .filter((source) => source != null)
    .reduce((acc, source) => deepMerge(acc, source), dest)
}

/**
 * Recursively merges the properties of the source object into the destination object.
 *
 * @param {Object} dest - The destination object to merge into.
 * @param {Object} source - The source object to merge from.
 * @returns {Object} - The merged destination object.
 */
function deepMerge(dest, source) {
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value) || isObject(value)) {
      if (dest[key] === undefined) {
        dest[key] = new value.__proto__.constructor()
      }
      dest[key] = deepMerge(dest[key], value)
    } else {
      dest[key] = value
    }
  }
  return dest
}
