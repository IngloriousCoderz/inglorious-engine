import imageDraw from "./image.js"

const DEFAULT_SCALE = 1

const FLIP = -1
const NO_FLIP = 1

const CENTER_WIDTH = 2
const CENTER_HEIGHT = 2

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000
const FLIPPED_VERTICALLY_FLAG = 0x40000000
// const FLIPPED_DIAGONALLY_FLAG = 0x20000000
// const ROTATED_HEXAGONAL_120_FLAG = 0x10000000

export default function draw(ctx, instance, options) {
  const { tilemap } = instance
  const { image, layers } = tilemap
  const { imageSize, tileSize, columns, scale = DEFAULT_SCALE } = image

  const [imageWidth] = imageSize
  const [tileWidth, tileHeight] = tileSize
  const cols = imageWidth / tileWidth

  ctx.save()

  layers.forEach(({ tiles }) => {
    tiles.forEach((flaggedTile, index) => {
      const isFlippedHorizontally = !!(flaggedTile & FLIPPED_HORIZONTALLY_FLAG)
      const isFlippedVertically = !!(flaggedTile & FLIPPED_VERTICALLY_FLAG)

      let tile = flaggedTile
      tile &= ~FLIPPED_HORIZONTALLY_FLAG
      tile &= ~FLIPPED_VERTICALLY_FLAG

      const sx = tile % cols
      const sy = Math.floor(tile / cols)

      const dx = (index % columns) * tileWidth
      const dy = Math.floor(index / columns) * tileHeight

      ctx.save()

      ctx.scale(scale, scale)
      ctx.translate(dx, dy)

      ctx.translate(tileWidth / CENTER_WIDTH, tileHeight / CENTER_HEIGHT)
      ctx.scale(
        isFlippedHorizontally ? FLIP : NO_FLIP,
        isFlippedVertically ? FLIP : NO_FLIP,
      )
      ctx.translate(-tileWidth / CENTER_WIDTH, -tileHeight / CENTER_HEIGHT)

      imageDraw(ctx, { image, sx, sy }, options)

      ctx.restore()
    })
  })

  ctx.restore()
}
