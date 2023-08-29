import loop from './loop'
import { createStore } from './store'

const DEFAULT_FPS = 60
const ONE_SECOND = 1000

const DEFAULT_LOOP = { type: 'animationFrame', fps: DEFAULT_FPS }

const engine = {
  load(game) {
    const { types, state, ...rest } = game
    this._config = { loop: DEFAULT_LOOP, ...rest }
    this._store = createStore({ types, state })
  },

  start() {
    const { type, fps } = this.config.loop
    const msPerFrame = ONE_SECOND / fps

    loop[type].start(this, msPerFrame)
  },

  stop() {
    const { type } = this.config.loop
    loop[type].stop()
  },

  update(elapsed) {
    this.store.update(elapsed)
  },

  get config() {
    return this._config
  },

  get store() {
    return this._store
  },

  getState() {
    return this.store.getState()
  },
}

export default engine
