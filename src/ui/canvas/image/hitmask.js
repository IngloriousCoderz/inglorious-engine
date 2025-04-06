import drawRectangle from "@inglorious/ui/canvas/shapes/rectangle.js"
import { max } from "@inglorious/utils/data-structures/array.js"

const NO_Y = 0
const MAX_HUE = 255

export default function draw(ctx, instance, options) {
  const { tileSize, columns, heights } = instance

  const [tileWidth, tileHeight] = tileSize
  const rows = Math.ceil(heights.length / columns)
  const height = rows * tileHeight

  const minH = 0
  const maxH = max(heights)

  heights.forEach((h, index) => {
    const x = (index % columns) * tileWidth
    const z = Math.floor(index / columns) * tileHeight - height

    ctx.save()

    const normalizedH = (h - minH) / (maxH - minH)
    const hue = MAX_HUE - normalizedH * MAX_HUE

    const instance = {
      position: [x, NO_Y, z],
      size: tileSize,
      color: "transparent",
      backgroundColor: `hsla(${hue}, 100%, 50%, 0.2)`,
    }

    drawRectangle(ctx, instance, options)

    ctx.restore()
  })
}
