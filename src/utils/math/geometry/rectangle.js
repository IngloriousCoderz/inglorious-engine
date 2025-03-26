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
