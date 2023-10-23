import move from '@inglorious/engine/ai/movement/steering/move'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...inputType({
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowUp: 'up',
    }),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { input0 } = instances

        instance.acceleration = [0, 0, 0]
        if (input0.left) {
          instance.acceleration[0] = -instance.maxAcceleration
        }
        if (input0.down) {
          instance.acceleration[2] = -instance.maxAcceleration
        }
        if (input0.right) {
          instance.acceleration[0] = instance.maxAcceleration
        }
        if (input0.up) {
          instance.acceleration[2] = instance.maxAcceleration
        }

        merge(instance, move(instance, { dt }))

        clampToBounds(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(),

      character: {
        type: 'character',
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      },
    },
  },
}
