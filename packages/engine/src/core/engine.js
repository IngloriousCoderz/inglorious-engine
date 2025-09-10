import { game } from "@inglorious/engine/behaviors/game.js"
import { createApi } from "@inglorious/store/api.js"
import { createStore } from "@inglorious/store/store.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

import { coreEvents } from "./core-events.js"
import { disconnectDevTools, initDevTools, sendAction } from "./dev-tools.js"
import { Loops } from "./loops/loops.js"
import { entityPoolMiddleware } from "./middlewares/entity-pool/entity-pool-middleware.js"
import { EntityPools } from "./middlewares/entity-pool/entity-pools.js"
import { applyMiddlewares } from "./middlewares/middlewares.js"
import { multiplayerMiddleware } from "./middlewares/multiplayer-middleware.js"

// Default game configuration
// loop.type specifies the type of loop to use (defaults to "animationFrame").
const DEFAULT_GAME_CONFIG = {
  loop: { type: "animationFrame", fps: 60 },

  systems: [],

  types: {
    game: [game()],
  },

  entities: {
    // eslint-disable-next-line no-magic-numbers
    game: { type: "game", bounds: [0, 0, 800, 600] },
  },
}

const ONE_SECOND = 1000 // Number of milliseconds in one second.

/**
 * Engine class responsible for managing the game loop, state, and rendering.
 */
export class Engine {
  /**
   * @param {Object} [gameConfig] - Game-specific configuration.
   * @param {Object} [renderer] - UI entity responsible for rendering. It must have a `render` method.
   */
  constructor(gameConfig) {
    this._config = extend(DEFAULT_GAME_CONFIG, gameConfig)

    // Determine devMode from the entities config.
    const devMode = this._config.entities.game?.devMode
    this._devMode = devMode

    // Add user-defined systems
    const systems = [...(this._config.systems ?? [])]
    if (this._config.renderer) {
      systems.push(...this._config.renderer.getSystems())
    }

    this._store = createStore({ ...this._config, systems })

    // Create API layer, with optional methods for debugging
    this._api = createApi(this._store)

    this._entityPools = new EntityPools()
    this._api = applyMiddlewares(entityPoolMiddleware(this._entityPools))(
      this._api,
    )
    this._api.getAllActivePoolEntities = () =>
      this._entityPools.getAllActiveEntities()

    if (this._devMode) {
      this._api.getEntityPoolsStats = () => this._entityPools.getStats()
    }

    // Apply multiplayer if specified.
    const multiplayer = this._config.entities.game?.multiplayer
    if (multiplayer) {
      this._api = applyMiddlewares(multiplayerMiddleware(multiplayer))(
        this._api,
      )
    }

    this._loop = new Loops[this._config.loop.type]()

    // The renderer might need the engine instance to initialize itself (e.g., to set up DOM events).
    this._config.renderer?.init(this)

    if (this._devMode) {
      initDevTools(this._store)
    }
  }

  /**
   * Starts the game engine, initializing the loop and notifying the store.
   */
  start() {
    this._api.notify("start")
    this._loop.start(this, ONE_SECOND / this._config.loop.fps)
    this.isRunning = true
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._api.notify("stop")
    this._store.update(this._api)
    this._loop.stop()
    this.isRunning = false
  }

  /**
   * Updates the game state.
   * @param {number} dt - Delta time since the last update in milliseconds.
   */
  update(dt) {
    this._api.notify("update", dt)
    const processedEvents = this._store.update(this._api)
    const state = this._store.getState()

    // Check for devMode changes and connect/disconnect dev tools accordingly.
    const newDevMode = state.entities.game?.devMode
    if (newDevMode !== this._devMode) {
      if (newDevMode) {
        initDevTools(this._api)
      } else {
        disconnectDevTools()
      }
      this._devMode = newDevMode
    }

    const eventsToLog = processedEvents.filter(
      ({ type }) => !coreEvents.includes(type),
    )

    if (eventsToLog.length) {
      const action = {
        type: eventsToLog.map(({ type }) => type).join("|"),
        payload: eventsToLog,
      }
      sendAction(action, state)
    }
  }
}
