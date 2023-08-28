import { processInput, render, update } from '../methods'

export default async function loop(engine, msPerUpdate) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    update(engine, elapsed)
    render(engine)

    previousTime = currentTime
    await sleep(Date.now() - currentTime + msPerUpdate)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
