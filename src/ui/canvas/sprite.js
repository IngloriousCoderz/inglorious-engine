/* eslint-disable no-magic-numbers */

export default function draw(ctx, options) {
  const { config, type, sprite } = options
  const { id, width, height, rows, cols, scale, states } =
    config.types[type].sprite

  const img = document.getElementById(id)

  const { frames, flip } = states[sprite.state]
  const [sx, sy] = frames[sprite.value]

  const cellWidth = width / cols
  const cellHeight = height / rows

  ctx.scale(flip === 'h' ? -1 : 1, flip === 'v' ? -1 : 1)
  ctx.scale(scale, scale)
  ctx.translate(-cellWidth / 2, -cellHeight / 2)

  ctx.drawImage(
    img,
    sx * cellWidth,
    sy * cellHeight,
    cellWidth,
    cellHeight,
    0,
    0,
    cellWidth,
    cellHeight
  )
}
