/* eslint-disable no-magic-numbers */
import * as Animation from '@inglorious/game/animation.js'
import draw from '@inglorious/ui/canvas/fps.js'

const DEFAULT_SIZE = 16

export function type(type) {
  return {
    accuracy: 1,
    size: DEFAULT_SIZE,

    dt: {
      speed: 1,
      value: 60,
    },

    'game:update'(instance, event, options) {
      Animation.play('dt', 'default', instance, { ...options, onTick })
    },

    draw,
    ...type,
  }
}

function onTick(instance, options) {
  instance.dt.value = options.dt
}
