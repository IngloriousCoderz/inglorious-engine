export function processInput() {
  // TODO: implement this function
}

export function update(engine, elapsed) {
  engine.update(elapsed)
}

export function render(engine, lag) {
  // TODO: implement this function for real
  const { entities } = engine.getState()
  const canvas = document.querySelector('canvas')

  if (!canvas) {
    return
  }

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = 'darkgrey'
  ctx.fillRect(0, 0, 100, 100)

  entities.forEach((entity) => {
    ctx.fillStyle = 'white'
    const [x, , z] = entity.position
    ctx.fillRect(x, z, 10, 10)
  })
}
