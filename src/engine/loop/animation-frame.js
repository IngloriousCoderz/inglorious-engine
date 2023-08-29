const ONE_SECOND = 1000

let id = null
let previousTime = new Date()

export function start(engine) {
  tick(engine)
}

export function stop() {
  window.cancelAnimationFrame(id)
  id = null
}

function tick(engine) {
  const currentTime = new Date()
  id = window.requestAnimationFrame(() => tick(engine))
  const elapsed = currentTime - previousTime

  engine.processInput()
  engine.update(elapsed / ONE_SECOND)
  engine.render(engine)

  previousTime = currentTime
}
