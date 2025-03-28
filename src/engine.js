import { extend } from "@inglorious/utils/data-structures/objects.js"

import Loop from "./engine/loop.js"
import { createStore } from "./engine/store.js"

// Default configuration for the engine
// loop.type specifies the type of loop to use (defaults to "animationFrame").
const DEFAULT_CONFIG = {
  loop: { type: "animationFrame" },
}
const ONE_SECOND = 1000 // Number of milliseconds in one second.

/**
 * Engine class responsible for managing the game loop, state, and rendering.
 */
export default class Engine {
  /**
   * @param {Object} game - Game-specific configuration.
   * @param {Object} ui - UI instance responsible for rendering.
   */
  constructor(game, ui) {
    this._config = extend(DEFAULT_CONFIG, game)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
    this._ui = ui
  }

  /**
   * Starts the game engine, initializing the loop and notifying the store.
   */
  start() {
    this._store.notify({ id: "game:start" })
    this._loop.start(this, ONE_SECOND / this._config.loop.fps)
    this.isRunning = true
  }

  /**
   * Updates the game state.
   * @param {number} dt - Delta time since the last update in milliseconds.
   */
  update(dt) {
    this._store.update(dt)
  }

  /**
   * Renders the game state using the UI.
   * @param {number} dt - Delta time since the last render in milliseconds.
   */
  render(dt) {
    this._ui?.render({
      dt,
      types: this._store.getTypes(),
      instances: this._store.getState().instances,
    })
  }

  /**
   * Notifies the store of an event.
   * @param {Object} event - Event object to notify the store with.
   */
  notify = (event) => {
    this._store.notify(event)
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._store.notify({ id: "game:stop" })
    this._store.update()
    this._loop.stop()
    this.isRunning = false
  }
}
