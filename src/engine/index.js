import loop from './loop'
import { createStore } from './store'

const DEFAULT_FPS = 60
const ONE_SECOND = 1000

const engine = {
  load(gameConfig) {
    const { handlers, state, ...rest } = gameConfig
    this._config = rest
    this._store = createStore({ handlers, state })
  },

  start() {
    const { type = 'animationFrame', fps = DEFAULT_FPS } =
      this.config.loop || {}
    const msPerFrame = ONE_SECOND / fps

    loop[type](this, msPerFrame)
  },

  stop() {
    this.getState().shouldQuit = true
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
