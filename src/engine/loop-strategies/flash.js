import { processInput, render, update } from '../methods'

export default async function loop(engine) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    update(engine, elapsed)
    render(engine)

    previousTime = currentTime
  }
}
