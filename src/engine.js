import { merge } from "@inglorious/utils/data-structures/objects.js"

import Loop from "./engine/loop.js"
import { createStore } from "./engine/store.js"

const DEFAULT_CONFIG = {
  loop: { type: "animationFrame" },
}

const ONE_SECOND = 1000

export default class Engine {
  constructor(game, ui) {
    this._config = merge({}, DEFAULT_CONFIG, game)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
    this._ui = ui
  }

  start() {
    const { fps } = this._config.loop
    const msPerFrame = ONE_SECOND / fps
    this._loop.start(this, msPerFrame)
    this.isRunning = true
    this._store.notify({ id: "game:start" })
  }

  update(dt) {
    this._store.update(dt)
  }

  render(dt) {
    this._ui?.render({
      dt,
      types: this._store.getTypes(),
      instances: this._store.getState().instances,
    })
  }

  notify = (event) => {
    this._store.notify(event)
  }

  stop() {
    this._store.notify({ id: "game:stop" })
    this._store.update()
    this._loop.stop()
    this.isRunning = false
  }
}
