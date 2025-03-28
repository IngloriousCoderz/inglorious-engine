/* eslint-disable no-magic-numbers */

export default function draw(ctx, instance) {
  const { id, src, width, height, rows, cols, scale, states } = instance.sprite

  const { frames, flip } = states[instance.sprite.state]
  const [sx, sy] = frames[instance.sprite.value]

  const cellWidth = width / cols
  const cellHeight = height / rows

  const imgParams = [
    sx * cellWidth,
    sy * cellHeight,
    cellWidth,
    cellHeight,
    0,
    0,
    cellWidth,
    cellHeight,
  ]

  ctx.save()

  ctx.scale(flip === "h" ? -1 : 1, flip === "v" ? -1 : 1)
  ctx.scale(scale, scale)
  ctx.translate(-cellWidth / 2, -cellHeight / 2)

  const img = document.getElementById(id)
  if (img) {
    ctx.drawImage(img, ...imgParams)
  } else {
    const img = new Image()
    img.id = id
    img.style.display = "none"
    img.onload = () => {
      ctx.drawImage(img, ...imgParams)
    }
    img.src = src
    document.body.appendChild(img)
  }

  ctx.restore()
}
