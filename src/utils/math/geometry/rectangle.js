export function intersectsPlatform(rectangle, platform) {
  const [x, , z] = rectangle.position
  const [width] = rectangle.size

  const [left, , top] = platform.position
  const [extension, thickness] = platform.size

  const isAbove = z <= top && z >= top - thickness

  const isOverlappingX = x + width >= left && x <= left + extension

  return isAbove && isOverlappingX
}
