import loop from './loop'
import { createStore } from './store'

const DEFAULT_FPS = 60
const ONE_SECOND = 1000

const DEFAULT_LOOP = { type: 'animationFrame', fps: DEFAULT_FPS }

const engine = {
  get config() {
    return this._config
  },

  get store() {
    return this._store
  },

  getInstances(type) {
    return this.store
      ?.getState()
      .instances.filter((instance) => instance.type === type)
  },

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

  processInput() {
    // TODO: implement this function
  },

  update(elapsed) {
    this.store.update(elapsed)
  },

  render(msPerUpdate) {
    // TODO: implement this function
  },
}

export default engine
