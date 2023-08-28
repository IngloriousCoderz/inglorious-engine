import gameLoops from './game-loops'
import { createStore } from './store'

const ONE_FPS = 1
const ONE_MILLISECOND = 1
const TO_SECONDS = 1000

const engine = {
  load(gameConfig) {
    this.config = gameConfig
    const { handlers, state } = this.config
    this.store = createStore({ handlers, state })
  },

  start(strategy) {
    const fps = this.config.fps || ONE_FPS
    const msPerFrame = (ONE_MILLISECOND * TO_SECONDS) / fps

    gameLoops[strategy](this, msPerFrame)
  },

  update(elapsed) {
    this.store.update(elapsed)
  },

  getConfig() {
    return this.config
  },

  getStore() {
    return this.store
  },

  getState() {
    return this.store.getState()
  },
}

export default engine
