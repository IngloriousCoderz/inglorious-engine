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

export default function draw(instance, ctx) {
  const { image, frames, state, value } = instance.sprite
  const { imageSize, tileSize, scale = DEFAULT_SCALE } = image

  const [imageWidth] = imageSize
  const [tileWidth, tileHeight] = tileSize
  const cols = imageWidth / tileWidth

  const flaggedTile = frames[state][value]

  const isFlippedHorizontally = !!(flaggedTile & FLIPPED_HORIZONTALLY_FLAG)
  const isFlippedVertically = !!(flaggedTile & FLIPPED_VERTICALLY_FLAG)

  let tile = flaggedTile
  tile &= ~FLIPPED_HORIZONTALLY_FLAG
  tile &= ~FLIPPED_VERTICALLY_FLAG

  const sx = tile % cols
  const sy = Math.floor(tile / cols)

  ctx.save()

  ctx.scale(scale, scale)

  ctx.scale(
    isFlippedHorizontally ? FLIP : NO_FLIP,
    isFlippedVertically ? FLIP : NO_FLIP,
  )
  ctx.translate(-tileWidth / CENTER_WIDTH, -tileHeight / CENTER_HEIGHT)

  imageDraw({ image, sx, sy }, ctx)

  ctx.restore()
}
