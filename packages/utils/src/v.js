/**
 * A utility function to create a vector from a list of coordinates.
 * This is a shorthand for `[x, y, z, ...]`.
 * It also tags the array with a non-enumerable `__isVector__` property for
 * efficient type checking.
 * @param {...number} coords - The coordinates of the vector.
 * @returns {Vector} The created vector.
 */
export function v(...coords) {
  Object.defineProperty(coords, "__isVector__", {
    value: true,
    enumerable: false,
    configurable: false,
    writable: false,
  })
  return coords
}
