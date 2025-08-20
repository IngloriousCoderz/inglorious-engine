import { Ticker } from "@inglorious/engine/animation/ticker.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_PARAMS = {
  accuracy: 1,
  size: 16,
  speed: 1,
  defaultValue: 0.016666666666666666,
}

export function fps(params) {
  params = extend(DEFAULT_PARAMS, params)

  return {
    start(instance) {
      instance.dt = instance.dt ?? params
    },

    update(instance, dt) {
      Ticker.tick({
        target: instance.dt,
        dt,
        onTick: (target, dt) => {
          target.value = dt
        },
      })
    },
  }
}
