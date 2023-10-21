import move from '@inglorious/engine/ai/movement/kinematic/move'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...inputType({
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowUp: 'up',
      KeyA: 'left',
      KeyD: 'right',
      KeyS: 'down',
      KeyW: 'up',
    }),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, instances }) {
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
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
