import seek from '@ezpz/engine/ai/movement/steering/seek'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  bounds: [0, 0, 800, 600],

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

        merge(instance, seek(instance, target, options))

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
        maxSpeed: 2,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
