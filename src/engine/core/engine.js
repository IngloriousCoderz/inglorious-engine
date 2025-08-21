import { extend } from "@inglorious/utils/data-structures/objects.js"

import Loop from "./loop.js"
import { createSelector } from "./select.js"
import { createStore } from "./store.js"

// Default configuration for the engine
// loop.type specifies the type of loop to use (defaults to "animationFrame").
const DEFAULT_CONFIG = {
  loop: { type: "animationFrame", fps: 60 },
}
const ONE_SECOND = 1000 // Number of milliseconds in one second.

/**
 * Engine class responsible for managing the game loop, state, and rendering.
 */
export class Engine {
  /**
   * @param {Object} game - Game-specific configuration.
   * @param {Object} renderer - UI entity responsible for rendering.
   */
  constructor(game, renderer) {
    this._config = extend(DEFAULT_CONFIG, game)
    this._store = createStore(this._config)
    this._loop = new Loop[this._config.loop.type]()
    this._renderer = renderer

    this._entitiesSelector = null
    this._entitySelectors = {}

    this._api = {
      createSelector: this.createSelector.bind(this),
      getEntities: this.getEntities.bind(this),
      getEntity: this.getEntity.bind(this),
      notify: this.notify,
      dispatch: this.dispatch,
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
   * Creates a memoized selector function. This selector does not require you to pass the state, because the engine will do it for you.
   * @param {Array<Function>} inputSelectors - An array of input selector functions.
   * @param {Function} resultFunc - A function that receives the results of the input selectors and returns a computed value.
   * @returns {Function} A memoized selector function that, when called, returns the selected state.
   */
  createSelector(inputSelectors, resultFunc) {
    const selector = createSelector(inputSelectors, resultFunc)

    return () => selector(this._store.getState())
  }

  getEntities() {
    if (!this._entitiesSelector) {
      this._entitiesSelector = this.createSelector(
        [(state) => state.entities],
        (entities) => entities,
      )
    }
    return this._entitiesSelector()
  }

  getEntity(id) {
    if (!this._entitySelectors[id]) {
      this._entitySelectors[id] = this.createSelector(
        [(state) => state.entities],
        (entities) => entities[id],
      )
    }

    return this._entitySelectors[id]()
  }

  /**
   * Updates the game state.
   * @param {number} dt - Delta time since the last update in milliseconds.
   */
  update(dt) {
    this._store.update(dt, this._api)
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

  /**
   * Notifies the store of an event.
   * @param {string} id - Event object id to notify the store with.
   * @param {any} payload - Event object payload to notify the store with.
   */
  notify = (id, payload) => {
    this._store.notify(id, payload)
  }

  /**
   * Dispatches an action to the store. This was added for compatibility with React.
   * @param {object} action - Action object to be dispatched.
   */
  dispatch = (action) => {
    this._store.dispatch(action)
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._store.notify("stop")
    this._store.update()
    this._loop.stop()
    this.isRunning = false
  }
}
