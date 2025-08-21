/* eslint-disable no-magic-numbers */

export function renderButton(entity, ctx) {
  const { size, color = "black", thickness = 1 } = entity
  const [width = 100, height = 50] = size

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color

  if (entity.state === "pressed") {
    ctx.fillStyle = "white"
  } else {
    ctx.fillStyle = "black"
  }

  ctx.beginPath()
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
