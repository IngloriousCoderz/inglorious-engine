const ONE_SECOND = 1000

export default class ElapsedLoop {
  _shouldStop = false

  start(engine) {
    let previousTime = Date.now()

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const dt = currentTime - previousTime

      engine.update(dt / ONE_SECOND)

      previousTime = currentTime
    }
  }

  stop() {
    this._shouldStop = true
  }
}
