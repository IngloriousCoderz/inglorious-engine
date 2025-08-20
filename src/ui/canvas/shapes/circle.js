/* eslint-disable no-magic-numbers */

import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export function renderCircle(entity, ctx) {
  const {
    offset = zero(),
    radius = 24,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = entity
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
