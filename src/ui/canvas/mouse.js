/* eslint-disable no-magic-numbers */
const NO_Y = 0

export function track(parent, options) {
  const handleMouseMove = createHandler('mouse:move', parent, options)
  const handleClick = createHandler('mouse:click', parent, options)

  return { onMouseMove: handleMouseMove, onClick: handleClick }
}

function createHandler(id, parent, { notify }) {
  return (event) => {
    event.stopPropagation()

    if (parent == null) {
      return
    }

    const payload = calculatePosition({
      clientX: event.clientX,
      clientY: event.clientY,
      parent,
    })

    notify({ id, payload })
  }
}

function calculatePosition({ clientX, clientY, parent }) {
  const bounds = parent.getBoundingClientRect()

  const scaleX = (parent.width || parent.clientWidth) / bounds.width
  const scaleY = (parent.height || parent.clientHeight) / bounds.height

  const x = (clientX - bounds.left) * scaleX
  const z = (bounds.bottom - clientY) * scaleY

  return [x, NO_Y, z]
}

export function draw(ctx) {
  ctx.strokeStyle = 'black'
  ctx.fillStyle = 'black'
  ctx.lineWidth = 1

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
}
