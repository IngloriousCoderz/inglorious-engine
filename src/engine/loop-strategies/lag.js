import { processInput, render, update } from '../methods'

const MS_PER_UPDATE = 33.3

export default async function loop(engine) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()
  let lag = 0

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    processInput()

    while (lag >= MS_PER_UPDATE) {
      update(engine, elapsed)
      lag -= MS_PER_UPDATE
    }

    const normalizedLag = lag / MS_PER_UPDATE
    render(engine, normalizedLag)
  }
}
