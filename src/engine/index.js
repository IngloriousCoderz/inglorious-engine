const { createStore } = require('./store')
const gameLoops = require('./game-loops')

const ONE_MILLISECOND = 1
const TO_SECONDS = 1000

// TODO: retrieve configuration
const handlers = {}
const state = { shouldQuit: false }

const store = createStore(handlers, state)

module.exports = {
  start(strategy) {
    const fps = 1 // TODO: use value from configuration
    const msPerFrame = (ONE_MILLISECOND * TO_SECONDS) / fps

    const { shouldQuit } = store.getState()

    gameLoops[strategy](store, { msPerFrame, shouldQuit })
  },
}
