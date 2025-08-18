/* eslint-disable no-magic-numbers */

import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default function draw(ctx, instance) {
  const {
    offset = zero(),
    radius = 24,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = instance
  const [x, y, z] = offset

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.translate(-x, -y - z)

  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * pi())
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
