import seek from '../../../../ai/movement/steering/seek'
import engine from '../../../../engine'
import { mouseInstance, mouseType } from '../../../../input/mouse'
import { clampToBounds } from '../../../../utils/characters'

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
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.mouse
        instance = { ...instance, ...seek(instance, target, options) }

        clampToBounds(instance, engine.config.bounds)

        return instance
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
