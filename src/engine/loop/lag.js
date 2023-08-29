import { processInput, render, update } from '../methods'

const ONE_SECOND = 1000

let shouldStop = false

export async function loop(engine, msPerUpdate) {
  let previousTime = Date.now()
  let lag = 0

  while (!shouldStop) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    processInput()

    while (lag >= msPerUpdate) {
      update(engine, elapsed / ONE_SECOND)
      lag -= msPerUpdate
    }

    const normalizedLag = lag / msPerUpdate
    render(engine, normalizedLag)
  }
}

export function stop() {
  shouldStop = true
}
