import wander from '@ezpz/engine/ai/movement/kinematic/wander'
import { flip } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    elapsed: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { engine, ...options }) {
        merge(instance, wander(instance, options))
        flip(instance, engine.config.bounds)
      },
    },
  },

  state: {
    instances: {
      debug: {
        type: 'elapsed',
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