import { merge } from '@inglorious/utils/data-structures/objects'

import Loop from './loop'
import { createStore } from './store'

const DEFAULT_CONFIG = {
  bounds: [0, 0, 800, 600], // eslint-disable-line no-magic-numbers
  loop: { type: 'animationFrame' },
}

const ONE_SECOND = 1000

export default class Engine {
  constructor(game) {
    this._config = merge({}, DEFAULT_CONFIG, game)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
  }

  get config() {
    return this._config
  }

  start() {
    const { fps } = this._config.loop
    const msPerFrame = ONE_SECOND / fps
    this._loop.start(this, msPerFrame)
  }

  update(dt) {
    this._store.update(dt)
  }

  notify(event) {
    this._store.notify(event)
  }

  stop() {
    this._store.notify({ id: 'game:stop' })
    this._store.update()
    this._loop.stop()
  }
}
