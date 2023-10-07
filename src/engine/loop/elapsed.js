const ONE_SECOND = 1000

export default class ElapsedLoop {
  _shouldStop = false

  start(engine) {
    let previousTime = Date.now()

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const elapsed = currentTime - previousTime

      engine.update(elapsed / ONE_SECOND)

      previousTime = currentTime
    }
  }

  stop() {
    this._shouldStop = true
  }
}
