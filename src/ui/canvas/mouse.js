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
