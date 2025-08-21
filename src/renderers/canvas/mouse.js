/* eslint-disable no-magic-numbers */

export function renderMouse(entity, ctx) {
  const { color = "black", thickness = 1, orientation = 0 } = entity

  ctx.save()

  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = thickness

  ctx.rotate(-orientation)

  ctx.beginPath()
  ctx.moveTo(-6, 0)
  ctx.lineTo(-3, 0)
  ctx.stroke()

  ctx.moveTo(4, 0)
  ctx.lineTo(7, 0)
  ctx.stroke()

  ctx.moveTo(0, -6)
  ctx.lineTo(0, -3)
  ctx.stroke()

  ctx.moveTo(0, 4)
  ctx.lineTo(0, 7)
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.fillRect(0, 0, 1, 1)
  ctx.closePath()

  ctx.restore()
}
