/**
 * Checks if a platform intersects with a circle in 3D space.
 * @param {Platform} platform - The platform to check.
 * @param {Circle} circle - The circle to check.
 * @returns {boolean} True if the platform intersects the circle, false otherwise.
 */
export function intersectsCircle(platform, circle) {
  const [left, top, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const [x, y, z] = circle.position

  const lowestPoint = y - circle.radius
  const isAbove = lowestPoint <= top && lowestPoint >= top - elevation

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
  const [left, top, front] = platform.position
  const [extension, elevation, thickness] = platform.size

  const [x, y, z] = rectangle.position
  const [width, , depth] = rectangle.size

  const isAbove = y >= top && y <= top + elevation

  const isOverlappingX = x + width >= left && x <= left + extension
  const isOverlappingZ = z + depth >= front && z <= front + thickness

  return isAbove && isOverlappingX && isOverlappingZ
}
