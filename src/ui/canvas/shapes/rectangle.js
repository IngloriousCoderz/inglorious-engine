/* eslint-disable no-magic-numbers */

import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export default function draw(ctx, instance) {
  const {
    position = zero(),
    size,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = instance
  const [x, , z] = position
  const [width = 100, , height = 50] = size

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.translate(x, z)

  ctx.beginPath()
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
