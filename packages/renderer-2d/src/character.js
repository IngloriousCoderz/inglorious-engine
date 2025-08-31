/* eslint-disable no-magic-numbers */

import { renderCircle } from "./shapes/circle.js"

export function renderCharacter(entity, ctx) {
  const { size = 24, orientation = 0 } = entity

  const radius = size * 0.5

  ctx.save()

  ctx.rotate(-orientation)
  ctx.translate(radius - 1, 0)

  ctx.fillStyle = "black"

  ctx.beginPath()
  ctx.moveTo(0, 6)
  ctx.lineTo(0, -6)
  ctx.lineTo(6, 0)
  ctx.fill()
  ctx.closePath()
  ctx.restore()

  ctx.save()

  renderCircle(
    {
      ...entity,
      radius,
      position: undefined,
      backgroundColor: "lightgrey",
    },
    ctx,
  )

  ctx.restore()
}
