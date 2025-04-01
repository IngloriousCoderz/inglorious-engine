import "./sprite.module.css"

const DEFAULT_SCALE = 1
const DEFAULT_FLIP = ""

const FLIP = -1
const NO_FLIP = 1

const CENTER_WIDTH = 2
const CENTER_HEIGHT = 2

export default function Sprite({ instance, className, style: customStyle }) {
  const { image, states, state, value } = instance.sprite
  const { src, tileSize, scale = DEFAULT_SCALE } = image
  const [tileWidth, tileHeight] = tileSize

  const { frames, flip = DEFAULT_FLIP } = states[state]
  const [sx, sy] = frames[value]

  let transform = ""
  transform += `translate(
    ${-tileWidth / CENTER_WIDTH}px,
    ${-tileHeight / CENTER_HEIGHT}px
  )`
  transform += `scale(
    ${flip.includes("h") ? FLIP : NO_FLIP},
    ${flip.includes("v") ? FLIP : NO_FLIP}
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
