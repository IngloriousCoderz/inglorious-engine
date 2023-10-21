import move from '@inglorious/engine/ai/movement/kinematic/move'
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
        const { input } = instances

        instance.velocity = [0, 0, 0]
        if (input.left) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input.down) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (input.right) {
          instance.velocity[0] = instance.maxSpeed
        }
        if (input.up) {
          instance.velocity[2] = instance.maxSpeed
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
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
