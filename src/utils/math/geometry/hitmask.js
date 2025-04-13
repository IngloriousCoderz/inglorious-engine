// @see https://jonathanwhiting.com/tutorial/collision/

const LOWER_BOUND = 0
const TOP_TILE_OFFSET = 1 // Offset to include the top boundary tile

export function findCollisions(hitmask, target) {
  const { position, tileSize, columns, heights } = hitmask
  const [left, top, front] = position
  const [tileWidth, tileHeight] = tileSize
  const rows = heights.length / columns

  const [x, y, z] = target.position
  const [width, height, depth] = target.size

  const leftTile = Math.floor((x - left) / tileWidth)
  const rightTile = Math.floor((x - left + width) / tileWidth)
  const bottomTile = Math.floor((z - front) / tileHeight)
  const topTile = Math.floor((z - front + depth) / tileHeight)

  if (
    leftTile < LOWER_BOUND ||
    rightTile > columns ||
    bottomTile < LOWER_BOUND ||
    topTile > rows
  ) {
    return false
  }

  for (let i = leftTile; i < rightTile; i++) {
    for (let j = bottomTile; j <= topTile + TOP_TILE_OFFSET; j++) {
      const heightAtTile = heights[i * columns + j]
      if (y + height <= top + heightAtTile) {
        return true
      }
    }
  }

  return false
}
