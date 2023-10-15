import wander from '@ezpz/engine/ai/movement/kinematic/wander'
import { flip } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'
import { pi } from '@ezpz/utils/math/trigonometry'

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
