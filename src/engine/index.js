import { createStore } from './store'
import gameLoops from './game-loops'

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

  getState() {
    return this.store.getState()
  },

  update(elapsed) {
    this.store.update(elapsed)
  },

  getStore() {
    return this.store
  },
}

export default engine
