import { audio } from "@inglorious/engine/behaviors/audio.js"
import { game } from "@inglorious/engine/behaviors/game.js"
import { createApi } from "@inglorious/store/api.js"
import { createStore } from "@inglorious/store/store.js"
import { augmentType } from "@inglorious/store/types.js"
import { isArray } from "@inglorious/utils/data-structures/array.js"
import { extendWith } from "@inglorious/utils/data-structures/objects.js"
import { isVector } from "@inglorious/utils/math/linear-algebra/vector.js"

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
    audio: [audio()],
  },

  entities: {
    // eslint-disable-next-line no-magic-numbers
    game: { type: "game", size: [800, 600] },
    audio: { type: "audio", sounds: {} },
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
  constructor(...gameConfigs) {
    this._config = extendWith(merger, DEFAULT_GAME_CONFIG, ...gameConfigs)

    // Determine devMode from the entities config.
    const devMode = this._config.entities.game?.devMode
    this._devMode = devMode

    // Add user-defined systems
    const systems = [...(this._config.systems ?? [])]

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

    if (this._devMode) {
      initDevTools(this._store)
    }
  }

  async init() {
    return Promise.all(
      Object.values(this._config.entities).map((entity) => {
        const originalType = this._config.types[entity.type]
        const type = augmentType(originalType)
        return type.init?.(entity, null, this._api)
      }),
    )
  }

  /**
   * Starts the game engine, initializing the loop and notifying the store.
   */
  start() {
    this._api.notify("start")
    this._loop.start(this, ONE_SECOND / this._config.loop.fps)
  }

  /**
   * Stops the game engine, halting the loop and notifying the store.
   */
  stop() {
    this._api.notify("stop")
    this._store.update(this._api)
    this._loop.stop()
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
        initDevTools(this._store)
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

function merger(targetValue, sourceValue) {
  if (
    isArray(targetValue) &&
    !isVector(targetValue) &&
    isArray(sourceValue) &&
    !isVector(sourceValue)
  ) {
    return [...targetValue, ...sourceValue]
  }
}
