import { processInput, render, update } from '../methods'

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

  processInput()
  update(engine, elapsed / ONE_SECOND)
  render(engine)

  previousTime = currentTime
}
