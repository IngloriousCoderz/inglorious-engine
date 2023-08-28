import { processInput, render, update } from '../methods'

const MS_PER_UPDATE = 33.3

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
    await sleep(Date.now() - currentTime + MS_PER_UPDATE)
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
