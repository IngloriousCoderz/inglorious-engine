import draw from "@inglorious/ui/canvas/image/sprite.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const DEFAULT_PARAMS = {
  id: null,
  src: null,
  width: 32,
  height: 32,
  rows: 1,
  cols: 1,
  scale: 1,
  speed: 0.2,
  states: {
    idle: { frames: [] },
  },
}

export function enableSprite(params) {
  params = extend(DEFAULT_PARAMS, params)

  return {
    draw,

    states: {
      idle: {
        "game:start"(instance) {
          instance.sprite = instance.sprite ?? params
        },
      },
    },
  }
}
