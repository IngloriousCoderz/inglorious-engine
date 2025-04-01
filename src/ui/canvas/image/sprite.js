import imageDraw from "./image.js"

const DEFAULT_SCALE = 1
const DEFAULT_FLIP = ""

const FLIP = -1
const NO_FLIP = 1

const CENTER_WIDTH = 2
const CENTER_HEIGHT = 2

export default function draw(ctx, instance, options) {
  const { image, states, state, value } = instance.sprite
  const { tileSize, scale = DEFAULT_SCALE } = image
  const [tileWidth, tileHeight] = tileSize

  const { frames, flip = DEFAULT_FLIP } = states[state]
  const [sx, sy] = frames[value]

  ctx.save()

  ctx.scale(scale, scale)
  ctx.scale(
    flip.includes("h") ? FLIP : NO_FLIP,
    flip.includes("v") ? FLIP : NO_FLIP,
  )
  ctx.translate(-tileWidth / CENTER_WIDTH, -tileHeight / CENTER_HEIGHT)

  imageDraw(ctx, { image, sx, sy }, options)

  ctx.restore()
}
