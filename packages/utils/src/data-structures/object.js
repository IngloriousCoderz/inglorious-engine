const INITIAL_LEVEL = 0
const NEXT_LEVEL = 2

/**
 * Creates a deep clone of the given object.
 *
 * @param {Object} obj - The object to clone.
 * @returns {Object} A deep clone of the input object.
 */
export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Filters the properties of an object based on a callback function.
 *
 * @param {Object} obj - The object to filter.
 * @param {Function} callback - A function that determines whether a property should be included.
 *                              Receives (key, value, obj) as arguments.
 * @returns {Object} A new object with the filtered properties.
 */
export function filter(obj, callback) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value], obj) =>
      callback(key, value, obj),
    ),
  )
}

/**
 * Finds the first property in an object that satisfies the callback function.
 *
 * @param {Object} obj - The object to search.
 * @param {Function} callback - A function that determines whether a property matches.
 *                              Receives (key, value, obj) as arguments.
 * @returns {Object} An object containing the first matching property, or an empty object if none match.
 */
export function find(obj, callback) {
  return Object.fromEntries([
    Object.entries(obj).find(([key, value], obj) => callback(key, value, obj)),
  ])
}

/**
 * Checks if a value is a plain object.
 *
 * @param {*} value - The value to check.
 * @returns {boolean} True if the value is a plain object, false otherwise.
 */
export function isObject(value) {
  return value != null && value.constructor === Object
}

/**
 * Maps the properties of an object using a callback function.
 *
 * @param {Object} obj - The object to map.
 * @param {Function} callback - A function that transforms each property.
 *                              Receives (key, value, obj) as arguments.
 * @returns {Object} A new object with the mapped properties.
 */
export function map(obj, callback) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = callback(key, value, obj)
    return acc
  }, {})
}

/**
 * A utility function inspired by Immer's `produce` API. It provides a convenient
 * way to work with immutable data structures by allowing "mutations" on a
 * temporary draft.
 *
 * **Important:** Unlike Immer, which uses structural sharing via proxies for
 * high performance, this implementation performs a full deep clone of the base
 * state on every call using `JSON.parse(JSON.stringify())`. This can be
 * inefficient for large or complex states. It is intended for simple use cases
 * where the convenience of the API outweighs the performance cost.
 *
 * The recipe function receives a draft copy of the state. It can either
 * mutate the draft and return nothing (`undefined`), or it can return a
 * completely new value, which will become the next state.
 *
 * Can be called in two ways:
 * - **Standard:** `produce(baseState, recipe, ...args)`
 * - **Curried:** `produce(recipe)` returns a new function `(baseState, ...args) => newState`
 *
 * @template T
 * @param {T|function(T, ...*): (T|void)} baseState The initial state, or a recipe for currying.
 * @param {function(T, ...*): (T|void)} [recipe] The recipe function.
 * @param {...*} args Additional arguments to pass to the recipe.
 * @returns {T | function(T, ...*): T} A new state, or a producer function if curried.
 */
export function produce(baseState, recipe, ...args) {
  if (typeof baseState === "function" && recipe === undefined) {
    const recipeFn = baseState
    return (state, ...recipeArgs) => produce(state, recipeFn, ...recipeArgs)
  }

  const draft = clone(baseState)
  const result = recipe(draft, ...args)
  return result === undefined ? draft : result
}

/**
 * Converts an object or array to a formatted string representation.
 *
 * @param {*} obj - The object or array to convert.
 * @param {number} [indentationLevel=INITIAL_LEVEL] - The current indentation level (used for nested structures).
 * @returns {string} A string representation of the input object or array.
 */
export function toString(obj, indentationLevel = INITIAL_LEVEL) {
  if (Array.isArray(obj)) {
    return `[
${obj
  .map(
    (item) =>
      " ".repeat(indentationLevel + NEXT_LEVEL) +
      toString(item, indentationLevel + NEXT_LEVEL),
  )
  .join(",\n")}
${" ".repeat(indentationLevel)}]`
  }

  if (typeof obj === "object" && obj != null) {
    return `{
${Object.entries(obj)
  .map(
    ([key, value]) =>
      `${" ".repeat(indentationLevel + NEXT_LEVEL)}${key}: ${toString(
        value,
        indentationLevel + NEXT_LEVEL,
      )}`,
  )
  .join(",\n")}
${" ".repeat(indentationLevel)}}`
  }

  if (typeof obj === "string") {
    return `"${obj}"`
  }

  return obj
}
