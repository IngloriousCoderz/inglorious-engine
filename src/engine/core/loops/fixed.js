const ONE_SECOND = 1000

export class FixedLoop {
  _shouldStop = false

  async start(engine, msPerUpdate) {
    let previousTime = Date.now()

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const dt = currentTime - previousTime

      engine.update(dt / ONE_SECOND)
      engine.render(dt / ONE_SECOND)

      previousTime = currentTime
      await sleep(Date.now() - currentTime + msPerUpdate)
    }
  }

  stop() {
    this._shouldStop = true
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
