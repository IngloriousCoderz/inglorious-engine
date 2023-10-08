import flee from '@ezpz/engine/ai/movement/steering/flee'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { engine, ...options }) {
        const target = engine.instances.mouse

        merge(instance, flee(instance, target, options))

        clampToBounds(instance, engine.config.bounds)
      },
    },
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

      character: {
        type: 'character',
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
