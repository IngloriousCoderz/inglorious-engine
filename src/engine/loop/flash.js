export default class FlashLoop {
  _shouldStop = false

  start(engine) {
    while (!this._shouldStop) {
      engine.update()
    }
  }

  stop() {
    this._shouldStop = true
  }
}
