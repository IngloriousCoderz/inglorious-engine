export default class FlashLoop {
  _shouldStop = false

  start(engine) {
    while (!this._shouldStop) {
      engine.update()
      engine.render()
    }
  }

  stop() {
    this._shouldStop = true
  }
}
