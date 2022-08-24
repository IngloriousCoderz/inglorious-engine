import { processInput, update, render } from './methods'
import * as time from '../helpers/time'

// @see https://gameprogrammingpatterns.com/game-loop.html

const LoopType = {
  nap: loopWithNap,
  elapsed: loopWithElapsed,
  lag: loopWithLag,
}

export default LoopType

async function loopWithNap(engine, msPerFrame) {
  const { shouldQuit } = engine.getState()

  while (!shouldQuit) {
    const currentTime = Date.now()

    processInput()
    update(engine)
    render(engine)

    await time.sleep(Date.now() - currentTime + msPerFrame)
  }
}

async function loopWithElapsed(engine) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    await update(engine, elapsed)
    render(engine)

    previousTime = currentTime
  }
}

async function loopWithLag(engine, msPerFrame) {
  const { shouldQuit } = engine.getState()

  let previousTime = Date.now()
  let lag = 0

  while (!shouldQuit) {
    let currentTime = Date.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    processInput()

    while (lag >= msPerFrame) {
      update(engine)
      lag -= msPerFrame
    }

    const normalizedLag = lag / msPerFrame
    await render(engine, normalizedLag)
  }
}
