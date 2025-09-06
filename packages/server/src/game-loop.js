import { performance } from "node:perf_hooks"

const ONE_SECOND = 1000
const TICK_RATE = 60 // 60 updates per second
const TICK_INTERVAL = ONE_SECOND / TICK_RATE // ~16.67ms
let lastTime = performance.now()

/**
 * Starts the main server-side game loop.
 * @param {object} store The game store instance.
 * @param {object} api The game API with broadcast functionality.
 */
export function start(store, api) {
  // The main server-side game loop.
  setInterval(() => {
    const currentTime = performance.now()
    const dt = (currentTime - lastTime) / ONE_SECOND // Convert to seconds
    lastTime = currentTime

    // The store's update function is the heart of the game loop.
    // It processes events and advances the game state.
    store.update(dt, api)
  }, TICK_INTERVAL)
}
