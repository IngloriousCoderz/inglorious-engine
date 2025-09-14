import { isFunction } from "../functions/function.js"
import { isArray } from "./array.js"
import { isObject } from "./object.js"

/**
 * Creates a new object by deeply merging a target object with one or more source objects.
 * This function is immutable; it does not modify the original `target` or `sources`.
 * Nested objects are merged recursively.
 * Arrays from a source object will overwrite arrays in the target object.
 *
 * @param {Object} target - The base object.
 * @param {...Object} sources - The source objects to merge into the target object.
 * @returns {Object} - A new object containing the merged properties.
 * @see {@link merge} for a mutable version.
 */
export function extend(target, ...sources) {
  return extendWith(undefined, target, ...sources)
}

/**
 * Merges multiple source objects into a target object.
 * This function is mutable; it modifies the `target` object in place.
 * Nested objects are merged recursively.
 * Arrays from a source object will overwrite arrays in the target object.
 *
 * @param {Object} target - The target object to merge into.
 * @param {...Object} sources - The source objects to merge from.
 * @returns {Object} - The merged target object.
 * @see {@link extend} for an immutable version.
 */
export function merge(target, ...sources) {
  return mergeWith(undefined, target, ...sources)
}

/**
 * Creates a new object by deeply merging a target object with one or more source objects,
 * using a custom merger function to handle specific properties.
 * This function is immutable.
 *
 * @param {Function} [merger] - A function to customize merging behavior. It receives `(targetValue, sourceValue)`. If it returns `undefined`, the default merge logic is used.
 * @param {Object} target - The base object.
 * @param {...Object} sources - The source objects to merge.
 * @returns {Object} A new object with the merged properties.
 */
export function extendWith(merger, target, ...sources) {
  return mergeWith(merger, {}, target, ...sources)
}

/**
 * Merges multiple source objects into a target object, using a custom merger function.
 * This function is mutable; it modifies the `target` object in place.
 *
 * @param {Function} [merger] - A function to customize merging behavior. It receives `(targetValue, sourceValue)`. If it returns `undefined`, the default merge logic is used.
 * @param {Object} target - The target object to merge into.
 * @param {...Object} sources - The source objects to merge from.
 * @returns {Object} The merged target object.
 */
export function mergeWith(merger, target, ...sources) {
  return sources
    .filter((source) => source != null)
    .reduce((acc, source) => deepMerge(acc, source, merger), target)
}

/**
 * Recursively merges properties from a source object into a target object.
 * This is a helper function for `merge` and `extend`.
 *
 * @param {Object} target - The target object to merge into.
 * @param {Object} source - The source object to merge from.
 * @param {Function} [merger] - An optional function to customize merging behavior for specific keys.
 * @returns {Object} - The modified target object.
 */
function deepMerge(target, source, merger) {
  for (const [key, value] of Object.entries(source)) {
    if (isFunction(merger)) {
      const mergedValue = merger(target[key], value)
      if (mergedValue !== undefined) {
        target[key] = mergedValue
        continue
      }
    }

    if (isArray(value)) {
      target[key] = value
    } else if (isObject(value)) {
      if (!isObject(target[key])) {
        target[key] = {}
      }
      target[key] = deepMerge(target[key], value, merger)
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
