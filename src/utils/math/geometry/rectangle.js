/**
 * @typedef {import("./types").Rectangle} Rectangle
 * @typedef {import("./types").Platform} Platform
 */

/**
 * Determines whether a rectangle intersects with a platform in 3D space.
 *
 * @param {Rectangle} rectangle - The rectangle defined by its position (top-left-front corner) and size (width, height, depth).
 * @param {Platform} platform - The platform defined by its position (top-left-front corner) and size (extension, elevation, thickness).
 * @returns {boolean} `true` if the rectangle intersects with the platform, otherwise `false`.
 */
export function intersectsPlatform(rectangle, platform) {
  const [x, y, z] = rectangle.position
  const [width, , depth] = rectangle.size

  const [left, top, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const isAbove = y >= top && y <= top + elevation

  const isOverlappingX = x + width >= left && x <= left + extension
  const isOverlappingZ = z + depth >= front && z <= front + thickness

  return isAbove && isOverlappingX && isOverlappingZ
}
