/* eslint-disable no-magic-numbers */

export default function draw(ctx, instance) {
  const {
    size,
    color = "black",
    backgroundColor = "transparent",
    thickness = 1,
  } = instance
  const [width = 100, height = 50] = size

  ctx.save()

  ctx.lineWidth = thickness
  ctx.strokeStyle = color
  ctx.fillStyle = backgroundColor

  ctx.beginPath()
  ctx.fillRect(0, 0, width, height)
  ctx.strokeRect(0, 0, width, height)
  ctx.stroke()
  ctx.closePath()

  ctx.restore()
}
