export function intersectsPlatform(rectangle, platform) {
  const [x, , z] = rectangle.position
  const [width] = rectangle.size

  const [left, , top] = platform.position
  const [extension] = platform.size

  const isAbove = z >= top

  const isOverlappingX = x >= left && x + width <= left + extension

  return isAbove && isOverlappingX
}
