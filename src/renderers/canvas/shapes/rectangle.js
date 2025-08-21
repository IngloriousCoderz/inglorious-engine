/* eslint-disable no-magic-numbers */

import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

export function renderRectangle(entity, ctx) {
  const {
    offset = zero(),
    size,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = entity
  const [x, y, z] = offset
  const [width = 100, height = 50, depth = 0] = size
  const rectHeight = height + depth

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.translate(-x, -y - z)

  ctx.fillRect(0, -rectHeight, width, rectHeight)
  ctx.strokeRect(0, -rectHeight, width, rectHeight)

  ctx.restore()
}
