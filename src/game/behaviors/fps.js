import { Animation } from "@inglorious/game/animation.js"
import render from "@inglorious/ui/canvas/fps.js"
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
    render,

    start(instance) {
      instance.dt = instance.dt ?? params
    },

    update(instance, dt) {
      Animation.play({ what: "dt", state: "default", instance, dt, onTick })
    },
  }
}

function onTick(instance, dt) {
  instance.dt.value = dt
}
