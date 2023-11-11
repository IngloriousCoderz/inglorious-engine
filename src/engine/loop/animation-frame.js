const ONE_SECOND = 1000

export default class AnimationFrameLoop {
  _id = null
  _previousTime = new Date()

  start(engine) {
    this._tick(engine)
  }

  stop() {
    window.cancelAnimationFrame(this._id)
    this._id = null
  }

  _tick(engine) {
    const currentTime = new Date()
    this._id = window.requestAnimationFrame(() => this._tick(engine))
    const dt = currentTime - this._previousTime

    engine.update(dt / ONE_SECOND)
    engine.render(dt / ONE_SECOND)

    this._previousTime = currentTime
  }
}
