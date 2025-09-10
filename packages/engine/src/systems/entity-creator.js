import { Ticker } from "@inglorious/engine/animation/ticker.js"

const DEFAULT_SPAWN_INTERVAL = 1 // Time in seconds between spawning entities.

/**
 * A system responsible for creating new entities, like asteroids, at regular intervals.
 *
 * @param {object} params Configuration parameters for the system.
 * @param {number} [params.spawnInterval=1] The time in seconds between spawning entities.
 * @param {function} params.factory A function that returns the properties for a new entity.
 * @returns {object} The configured entity creator system.
 */
export function entityCreator(params = {}) {
  const spawnInterval = params.spawnInterval ?? DEFAULT_SPAWN_INTERVAL
  const factory = params.factory

  const ticker = { speed: spawnInterval }

  return {
    update(state, dt, api) {
      Ticker.tick({
        target: ticker,
        dt,
        onTick: () => {
          api.notify("add", factory())
        },
      })
    },
  }
}
