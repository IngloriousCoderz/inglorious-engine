import { bounce } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  loop: { type: 'fixed', fps: 10 },

  types: {
    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, options) {
        merge(instance, bounce(instance, options))
      },
    },
  },

  state: {
    instances: {
      instance1: {
        type: 'fps',
        value: 0,
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
