import tank from '@inglorious/engine/ai/movement/kinematic/tank'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...inputType(),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const { input0 } = instances

        instance.velocity = [0, 0, 0]
        if (input0.left) {
          instance.orientation += 0.1
        }
        if (input0.down) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input0.right) {
          instance.orientation -= 0.1
        }
        if (input0.up) {
          instance.velocity[0] = instance.maxSpeed
        }

        merge(instance, tank(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowUp: 'up',
        KeyA: 'left',
        KeyD: 'right',
        KeyS: 'down',
        KeyW: 'up',
      }),

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
