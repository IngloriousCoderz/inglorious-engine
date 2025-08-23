// @see https://jonathanwhiting.com/tutorial/collision/

import { intersectsRectangle } from "./rectangle.js"

const FIRST_TILE = 0
const LAST_ROW = 1

export function findCollisions(hitmask, target) {
  const { position, tileSize, columns, heights } = hitmask
  const [tilemapX, tilemapY, tilemapZ] = position
  const [tileWidth, tileDepth] = tileSize
  const rows = heights.length / columns

  const [playerX, , playerZ] = target.position
  const [playerWidth, , playerDepth] = target.size

  const playerHitboxLeft = playerX
  const playerHitboxRight = playerX + playerWidth
  const playerHitboxBottom = playerZ
  const playerHitboxTop = playerZ + playerDepth

  const minTileX = Math.floor((playerHitboxLeft - tilemapX) / tileWidth)
  const maxTileX = Math.floor((playerHitboxRight - tilemapX) / tileWidth)
  const minTileZ = Math.floor((playerHitboxBottom - tilemapZ) / tileDepth)
  const maxTileZ = Math.floor((playerHitboxTop - tilemapZ) / tileDepth)

  for (let i = minTileX; i <= maxTileX; i++) {
    for (let j = minTileZ; j <= maxTileZ; j++) {
      if (i < FIRST_TILE || i >= columns || j < FIRST_TILE || j >= rows) {
        continue
      }

      const tileIndex = (rows - LAST_ROW - j) * columns + i
      const tileHeightValue = heights[tileIndex]

      if (tileHeightValue) {
        const tileRectangle = {
          position: [
            tilemapX + i * tileWidth,
            tilemapY,
            tilemapZ + j * tileDepth,
          ],
          size: [tileWidth, tileHeightValue, tileDepth],
        }

        if (intersectsRectangle(target, tileRectangle)) {
          return true
        }
      }
    }
  }

  return false
}
