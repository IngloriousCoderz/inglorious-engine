const ONE_SECOND = 1000

export default class NapLoop {
  _shouldStop = false

  async start(engine, msPerUpdate) {
    let previousTime = Date.now()

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const elapsed = currentTime - previousTime

      engine.update(elapsed / ONE_SECOND)

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
