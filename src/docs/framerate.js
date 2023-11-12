import character from '@inglorious/utils/canvas/character.js'
import fps, { animate } from '@inglorious/utils/canvas/fps.js'
import { bounce } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  loop: { type: 'fixed', fps: 10 },

  types: {
    fps: {
      'game:update'(instance, event, options) {
        instance.value = options.dt
        animate(instance, options)
      },

      draw: fps,
    },

    character: {
      'game:update'(instance, event, options) {
        merge(instance, bounce(instance, options))
      },

      draw: character,
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'fps',
        position: [0, 0, 600],
      },

      instance2: {
        type: 'character',
        maxSpeed: 250,
        orientation: pi() / 6,
        position: [0, 0, 0],
      },
    },
  },
}
