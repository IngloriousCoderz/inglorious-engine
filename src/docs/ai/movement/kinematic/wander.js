import wander from '@inglorious/engine/ai/movement/kinematic/wander'
import { flip } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, config }) {
        merge(instance, wander(instance, { dt }))
        flip(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        maxRotation: pi() / 4,
        orientation: 0,
        position: [0, 0, 300],
      },
    },
  },
}
