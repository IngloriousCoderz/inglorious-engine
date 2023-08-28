import { processInput, render, update } from '../methods'

let id = null
let previousTime = new Date()

export default function loop(engine) {
  tick(engine)
}

function tick(engine) {
  const currentTime = new Date()
  id = window.requestAnimationFrame(() => tick(engine))
  const elapsed = currentTime - previousTime

  processInput()
  update(engine, elapsed)
  render(engine)

  previousTime = currentTime

  const { shouldQuit } = engine.getState()
  if (shouldQuit) {
    stop()
  }
}

function stop() {
  window.cancelAnimationFrame(id)
  id = null
}
