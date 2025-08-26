import { extend } from "@inglorious/utils/data-structures/objects.js"

import { createApi } from "./api.js"
import { ACTION_BLACKLIST, initDevTools, sendAction } from "./dev-tools.js"
import Loop from "./loop.js"
import { createStore } from "./store.js"

// Default configuration for the engine
// loop.type specifies the type of loop to use (defaults to "animationFrame").
const DEFAULT_CONFIG = {
  devMode: false,
  loop: { type: "animationFrame", fps: 60 },
  systems: [],
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
  constructor(game) {
    this._config = extend(DEFAULT_CONFIG, game)

    const systems = [...(this._config.systems ?? [])]
    if (this._config.renderer) {
      systems.push(...this._config.renderer.getSystems())
    }

    this._store = createStore({ ...this._config, systems })
    this._loop = new Loop[this._config.loop.type]()
    this._api = createApi(this._store)

    // The renderer might need the engine instance to initialize itself (e.g., to set up DOM events).
    this._config.renderer?.init(this)

    if (this._config.devMode) {
      initDevTools(this._store)
    }
  }

  /**
   * Starts the game engine, initializing the loop and notifying the store.
   */
  start() {
    this._store.notify("start", this._api)
    this._loop.start(this, ONE_SECOND / this._config.loop.fps)
    this.isRunning = true
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._store.notify("stop", this._api)
    this._store.update(FINAL_UPDATE_DELTA_TIME, this._api)
    this._loop.stop()
    this.isRunning = false
  }

  /**
   * Updates the game state.
   * @param {number} dt - Delta time since the last update in milliseconds.
   */
  update(dt) {
    const eventsToProcess = this._store
      .getIncomingEvents()
      .filter(({ type }) => !ACTION_BLACKLIST.includes(type))

    this._store.update(dt, this._api)

    if (eventsToProcess.length) {
      const action = {
        type: eventsToProcess.map(({ type }) => type).join("|"),
        payload: eventsToProcess,
      }
      sendAction(action, this._store.getState())
    }
  }
}
