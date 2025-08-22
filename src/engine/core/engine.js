import { extend } from "@inglorious/utils/data-structures/objects.js"

import { createApi } from "./api.js"
import { initDevTools, sendAction } from "./dev-tools.js"
import Loop from "./loop.js"
import { createStore } from "./store.js"

// Default configuration for the engine
// loop.type specifies the type of loop to use (defaults to "animationFrame").
const DEFAULT_CONFIG = {
  devMode: false,
  loop: { type: "animationFrame", fps: 60 },
}
const ONE_SECOND = 1000 // Number of milliseconds in one second.

// Delta time for the final update call when stopping the engine.
const FINAL_UPDATE_DELTA_TIME = 0 // This ensures any pending events (like 'stop') are processed before shutdown.

/**
 * Engine class responsible for managing the game loop, state, and rendering.
 */
export class Engine {
  /**
   * @param {Object} [game] - Game-specific configuration.
   * @param {Object} [renderer] - UI entity responsible for rendering. It must have a `render` method.
   */
  constructor(game, renderer) {
    this._config = extend(DEFAULT_CONFIG, game)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
    this._renderer = renderer
    this._api = createApi(this._store, this._config)

    if (this._config.devMode) {
      initDevTools(this._store)
    }
  }

  /**
   * Starts the game engine, initializing the loop and notifying the store.
   */
  start() {
    this._store.notify("start")
    this._loop.start(this, ONE_SECOND / this._config.loop.fps)
    this.isRunning = true
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._store.notify("stop")
    this._store.update(FINAL_UPDATE_DELTA_TIME, this._api)
    this._loop.stop()
    this.isRunning = false
  }

  /**
   * Updates the game state.
   * @param {number} dt - Delta time since the last update in milliseconds.
   */
  update(dt) {
    const eventsToProcess = this._store.getIncomingEvents()

    this._store.update(dt, this._api)

    const state = this._store.getState()
    for (const event of eventsToProcess) {
      sendAction(event, state)
    }
  }

  /**
   * Renders the game state using the UI.
   * @param {number} dt - Delta time since the last render in milliseconds.
   */
  render(dt) {
    this._renderer?.render({
      dt,
      types: this._store.getTypes(),
      api: this._api,
    })
  }
}
