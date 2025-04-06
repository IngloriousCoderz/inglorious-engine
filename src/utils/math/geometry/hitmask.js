import { intersectsCircle, intersectsRectangle } from "./rectangle.js"

const Shape = {
  circle: intersectsCircle,
  rectangle: intersectsRectangle,
}

export function findCollisions(hitmask, target) {
  const fn = Shape[target.shape]

  const { position, tileSize, columns, heights } = hitmask
  const [left, top, front] = position
  const [tileWidth, tileHeight] = tileSize

  return heights.map((height, index) => {
    const dx = left + (index % columns) * tileWidth
    const dy = top
    const dz = front + Math.floor(index / columns) * tileHeight

    const tile = {
      position: [dx, dy, dz],
      size: [tileWidth, height, tileHeight],
    }

    return fn(tile, target)
  })
}
