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

  const drawX = x
  const drawY = -y - z - rectHeight

  ctx.fillRect(drawX, drawY, width, rectHeight)
  ctx.strokeRect(drawX, drawY, width, rectHeight)

  ctx.restore()
}
