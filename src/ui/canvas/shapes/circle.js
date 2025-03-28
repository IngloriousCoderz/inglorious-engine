/* eslint-disable no-magic-numbers */

import { pi } from "@inglorious/utils/math/trigonometry.js"

export default function draw(ctx, instance) {
  const {
    radius = 24,
    stroke = "black",
    fill = "transparent",
    thickness = 1,
  } = instance

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = stroke
  ctx.fillStyle = fill

  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * pi())
  ctx.fill()
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
