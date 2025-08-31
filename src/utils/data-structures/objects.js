import { isObject } from "./object.js"

/**
 * Extends a target object by merging it with one or more source objects.
 * Performs a deep merge for nested objects and arrays.
 *
 * @param {Object} target - The target object to extend.
 * @param {...Object} sources - The source objects to merge into the target object.
 * @returns {Object} - The extended target object.
 */
export function extend(target, ...sources) {
  return merge({}, target, ...sources)
}

/**
 * Merges multiple source objects into a target object.
 * Performs a deep merge for nested objects and arrays.
 *
 * @param {Object} target - The target object to merge into.
 * @param {...Object} sources - The source objects to merge from.
 * @returns {Object} - The merged target object.
 */
export function merge(target, ...sources) {
  return sources
    .filter((source) => source != null)
    .reduce((acc, source) => deepMerge(acc, source), target)
}

/**
 * Recursively merges the properties of the source object into the target object.
 *
 * @param {Object} target - The target object to merge into.
 * @param {Object} source - The source object to merge from.
 * @returns {Object} - The merged target object.
 */
function deepMerge(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (Array.isArray(value) || isObject(value)) {
      if (target[key] === undefined) {
        target[key] = new value.__proto__.constructor()
      }
      target[key] = deepMerge(target[key], value)
    } else {
      target[key] = value
    }
  }
  return target
}

/**
 * Assigns default properties to a target object from a source object.
 * For each key in `defaultProps`, if `target[key]` is `null` or `undefined`,
 * it is set to `defaultProps[key]`.
 *
 * This function modifies the target object in place.
 *
 * @param {Object} target The object to apply defaults to.
 * @param {Object} defaultProps The object containing the default properties.
 * @returns {Object} The modified target object.
 */
export function defaults(target, defaultProps) {
  for (const key in defaultProps) {
    target[key] ??= defaultProps[key]
  }
  return target
}
