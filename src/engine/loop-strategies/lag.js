import { processInput, render, update } from '../methods'

export default async function loop(engine, msPerUpdate) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()
  let lag = 0

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    processInput()

    while (lag >= msPerUpdate) {
      update(engine, elapsed)
      lag -= msPerUpdate
    }

    const normalizedLag = lag / msPerUpdate
    render(engine, normalizedLag)
  }
}
