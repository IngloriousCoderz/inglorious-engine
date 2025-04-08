/* eslint-disable no-magic-numbers */

import circle from "./shapes/circle.js"

export default function draw(ctx, instance) {
  const { size = 24, orientation = 0 } = instance

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

  circle(ctx, {
    ...instance,
    radius,
    position: undefined,
    backgroundColor: "lightgrey",
  })

  ctx.restore()
}
