/* eslint-disable no-magic-numbers */
const NO_Y = 0

export function trackMouse(parent, { notify }) {
  parent.addEventListener('mousemove', (event) => {
    event.stopPropagation()

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })

    notify({ id: 'mouse:move', payload })
  })

  parent.addEventListener('click', (event) => {
    event.stopPropagation()

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })

    notify({ id: 'mouse:click', payload })
  })
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()

  const scaleX = parent.width / bounds.width
  const scaleY = parent.height / bounds.height

  const x = (clientX - bounds.left) * scaleX
  const z = (bounds.bottom - clientY) * scaleY

  return [x, NO_Y, z]
}

export function draw(ctx) {
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  ctx.lineWidth = 1

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

  ctx.beginPath()
  ctx.fillRect(0, 0, 1, 1)
  ctx.closePath()
}
