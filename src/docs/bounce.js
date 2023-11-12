import { bounce } from '@inglorious/utils/character/bounds'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    fps: {
      frequency: 0.1,
      accuracy: 1,
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, options) {
        instance = merge(instance, bounce(instance, options))
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
