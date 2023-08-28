import { processInput, render, update } from '../methods'

const ONE_SECOND = 1000

export default async function loop(engine) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    update(engine, elapsed / ONE_SECOND)
    render(engine)

    previousTime = currentTime
  }
}
