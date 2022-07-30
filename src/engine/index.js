const gameLoops = require('./game-loops')

const ONE_MILLISECOND = 1
const TO_SECONDS = 1000

module.exports = {
  start(strategy) {
    const fps = 1 // TODO: retrieve from configuration
    const msPerFrame = (ONE_MILLISECOND * TO_SECONDS) / fps

    const shouldQuit = false // TODO: store in state

    gameLoops[strategy]({ msPerFrame, shouldQuit })
  },
}
