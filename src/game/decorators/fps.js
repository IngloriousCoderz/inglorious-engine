import * as Animation from "@inglorious/game/animation.js"
import draw from "@inglorious/ui/canvas/fps.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_PARAMS = {
  accuracy: 1,
  size: 16,
  dt: {
    speed: 1,
    value: 60,
  },
}

export function enableFps(params) {
  params = merge({}, DEFAULT_PARAMS, params)

  return (type) =>
    extend(type, {
      ...params,

      draw,

      "game:update"(instance, event, options) {
        Animation.play("dt", "default", instance, { ...options, onTick })
      },
    })
}

function onTick(instance, options) {
  instance.dt.value = options.dt
}
