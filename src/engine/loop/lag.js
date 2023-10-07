const ONE_SECOND = 1000

export default class LagLoop {
  _shouldStop = false

  start(engine, msPerUpdate) {
    let previousTime = Date.now()
    let lag = 0

    while (!this._shouldStop) {
      const currentTime = Date.now()
      const elapsed = currentTime - previousTime
      previousTime = currentTime
      lag += elapsed

      while (lag >= msPerUpdate) {
        engine.update(elapsed / ONE_SECOND)
        lag -= msPerUpdate
      }
    }
  }

  stop() {
    this._shouldStop = true
  }
}
