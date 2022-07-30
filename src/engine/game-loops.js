const { processInput, update, render } = require('./methods')
const time = require('../helpers/time')

// @see https://gameprogrammingpatterns.com/game-loop.html

module.exports = {
  nap: loopWithNap,
  elapsed: loopWithElapsed,
  lag: loopWithLag,
}

async function loopWithNap({ msPerFrame, shouldQuit }) {
  while (!shouldQuit) {
    const currentTime = Date.now()

    processInput()
    update()
    render()

    await time.sleep(Date.now() - currentTime + msPerFrame)
  }
}

async function loopWithElapsed({ shouldQuit }) {
  let previousTime = Date.now()

  while (!shouldQuit) {
    const currentTime = Date.now()
    const elapsed = currentTime - previousTime

    processInput()
    await update(elapsed)
    render()

    previousTime = currentTime
  }
}

async function loopWithLag({ msPerFrame, shouldQuit }) {
  let previousTime = Date.now()
  let lag = 0

  while (!shouldQuit) {
    let currentTime = Date.now()
    const elapsed = currentTime - previousTime
    previousTime = currentTime
    lag += elapsed

    processInput()

    while (lag >= msPerFrame) {
      update()
      lag -= msPerFrame
    }

    const normalizedLag = lag / msPerFrame
    await render(normalizedLag)
  }
}
