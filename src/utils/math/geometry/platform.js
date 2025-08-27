const HALF = 2

/**
 * Checks if a platform intersects with a circle in 3D space.
 * @param {Platform} platform - The platform to check.
 * @param {Circle} circle - The circle to check.
 * @returns {boolean} True if the platform intersects the circle, false otherwise.
 */
export function intersectsCircle(platform, circle) {
  const [platformX, platformY, platformZ] = platform.position
  const [extension, elevation, thickness] = platform.size

  const platformLeft = platformX - extension / HALF
  const platformRight = platformX + extension / HALF
  const platformBottom = platformY - elevation / HALF
  const platformTop = platformY + elevation / HALF
  const platformBack = platformZ - thickness / HALF
  const platformFront = platformZ + thickness / HALF

  const [x, y, z] = circle.position

  const lowestY = y - circle.radius
  const isAbove = lowestY >= platformBottom && lowestY <= platformTop

  const isOverlappingX = x >= platformLeft && x <= platformRight
  const isOverlappingZ = z >= platformBack && z <= platformFront

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
  const [platformX, platformY, platformZ] = platform.position
  const [extension, elevation, thickness] = platform.size

  const platformLeft = platformX - extension / HALF
  const platformRight = platformX + extension / HALF
  const platformBottom = platformY - elevation / HALF
  const platformTop = platformY + elevation / HALF
  const platformBack = platformZ - thickness / HALF
  const platformFront = platformZ + thickness / HALF

  const [x, y, z] = rectangle.position
  const [width, height, depth] = rectangle.size

  const left = x - width / HALF
  const right = x + width / HALF
  const bottom = y - height / HALF
  const back = z - depth / HALF
  const front = z + depth / HALF

  const isAbove = bottom >= platformBottom && bottom <= platformTop

  const isOverlappingX = right >= platformLeft && left <= platformRight
  const isOverlappingZ = front >= platformBack && back <= platformFront

  return isAbove && isOverlappingX && isOverlappingZ
}
