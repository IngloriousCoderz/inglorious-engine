import "./sprite.module.css"

const DEFAULT_SCALE = 1

const FLIP = -1
const NO_FLIP = 1

const CENTER_WIDTH = 2
const CENTER_HEIGHT = 2

const FLIPPED_HORIZONTALLY_FLAG = 0x80000000
const FLIPPED_VERTICALLY_FLAG = 0x40000000
// eslint-disable-next-line no-unused-vars
const FLIPPED_DIAGONALLY_FLAG = 0x20000000
// eslint-disable-next-line no-unused-vars
const ROTATED_HEXAGONAL_120_FLAG = 0x10000000

export default function Sprite({ entity, className, style: customStyle }) {
  const { image, frames, state, value } = entity.sprite
  const { src, imageSize, tileSize, scale = DEFAULT_SCALE } = image

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

  let transform = ""
  transform += `translate(
    ${-tileWidth / CENTER_WIDTH}px,
    ${-tileHeight / CENTER_HEIGHT}px
  )`
  transform += `scale(
    ${isFlippedHorizontally ? FLIP : NO_FLIP},
    ${isFlippedVertically ? FLIP : NO_FLIP}
    )`
  transform += `scale(${scale})`

  const style = {
    ...customStyle,
    width: `${tileWidth}px`,
    height: `${tileHeight}px`,
    backgroundImage: `url(${src})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: `-${sx * tileWidth}px -${sy * tileHeight}px`,
    transform,
  }

  return <div className={className} style={style} />
}
