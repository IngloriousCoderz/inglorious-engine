import { processInput, render, update } from '../methods'

const ONE_SECOND = 1000

let shouldStop = false

export async function start(engine) {
  let previousTime = Date.now()

  while (!shouldStop) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    update(engine, elapsed / ONE_SECOND)
    render(engine)

    previousTime = currentTime
  }
}

export function stop() {
  shouldStop = true
}
