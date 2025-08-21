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

    this._entitiesSelector = this.createSelector(
      [(state) => state.entities],
      (entities) => entities,
    )
    this._entitySelectors = {}

    this._api = {
      createSelector: this.createSelector,
      getEntities: this.getEntities,
      getEntity: this.getEntity,
      getType: (id) => this._store.getOriginalTypes()?.[id],
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
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._store.notify("stop")
    this._store.update(FINAL_UPDATE_DELTA_TIME, this._api)
    this._loop.stop()
    this.isRunning = false
  }

  /**
   * Creates a memoized selector function. This selector does not require you to pass the state, because the engine will do it for you.
   * @param {Array<Function>} inputSelectors - An array of input selector functions.
   * @param {Function} resultFunc - A function that receives the results of the input selectors and returns a computed value.
   * @returns {Function} A memoized selector function that, when called, returns the selected state.
   */
  createSelector = (inputSelectors, resultFunc) => {
    const selector = createSelector(inputSelectors, resultFunc)

    return () => selector(this._store.getState())
  }

  /**
   * Retrieves all entities from the store.
   * @returns {Object<string, Object>} A map of all entities.
   */
  getEntities = () => this._entitiesSelector()

  /**
   * Retrieves a single entity by its ID.
   * @param {string} id - The ID of the entity to retrieve.
   * @returns {Object} The entity object.
   */
  getEntity = (id) => {
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
   * @param {string} type - Event type to notify the store with.
   * @param {*} [payload] - Event payload to notify the store with.
   */
  // WARNING: This must be an arrow function to ensure `this` is correctly bound when passed in the API object.
  notify = (type, payload) => {
    this._store.notify(type, payload)
  }

  /**
   * Dispatches an action to the store. This is primarily for Redux DevTools compatibility.
   * @param {object} action - Action object to be dispatched.
   */
  // WARNING: This must be an arrow function to ensure `this` is correctly bound when passed in the API object.
  dispatch = (action) => {
    this._store.dispatch(action)
  }
}
