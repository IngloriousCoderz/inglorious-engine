const ONE_SECOND = 1000

export class LagLoop {
  _shouldStop = false

  start(engine, msPerUpdate) {
    let previousTime = Date.now()
    let lag = 0

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const dt = currentTime - previousTime
      previousTime = currentTime
      lag += dt

      while (lag >= msPerUpdate) {
        engine.update(dt / ONE_SECOND)
        lag -= msPerUpdate
      }
    }
  }

  stop() {
    this._shouldStop = true
  }
}
