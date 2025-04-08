/* eslint-disable no-magic-numbers */

import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export default function draw(ctx, instance) {
  const {
    offset = zero(),
    size,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = instance
  const [x, , z] = offset
  const [width = 100, height = 50, depth = 0] = size

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.translate(x, z)

  ctx.beginPath()
  ctx.fillRect(0, 0, width, height + depth)
  ctx.strokeRect(0, 0, width, height + depth)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
