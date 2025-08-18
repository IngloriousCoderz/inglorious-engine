/**
 * Checks if a platform intersects with a circle in 3D space.
 * @param {Platform} platform - The platform to check.
 * @param {Circle} circle - The circle to check.
 * @returns {boolean} True if the platform intersects the circle, false otherwise.
 */
export function intersectsCircle(platform, circle) {
  const [left, bottom, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const [x, y, z] = circle.position

  const lowestY = y - circle.radius
  const isAbove = lowestY >= bottom && lowestY <= bottom + elevation

  const isOverlappingX = x >= left && x <= left + extension
  const isOverlappingZ = z >= front && z <= front + thickness

  return isAbove && isOverlappingX && isOverlappingZ
}

/**
 * Determines whether platform intersects with a rectangle in 3D space.
 *
 * @param {Platform} platform - The platform defined by its position (top-left-front corner) and size (extension, elevation, thickness).
 * @param {Rectangle} rectangle - The rectangle defined by its position (top-left-front corner) and size (width, height, depth).
 * @returns {boolean} True if the platform intersects the rectangle, false otherwise.
 */
export function intersectsRectangle(platform, rectangle) {
  const [left, bottom, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const [x, y, z] = rectangle.position
  const [width, , depth] = rectangle.size

  const isAbove = y >= bottom && y <= bottom + elevation

  const isOverlappingX = x + width >= left && x <= left + extension
  const isOverlappingZ = z + depth >= front && z <= front + thickness

  return isAbove && isOverlappingX && isOverlappingZ
}
