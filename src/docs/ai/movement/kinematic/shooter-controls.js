import face from '@inglorious/engine/ai/movement/kinematic/face'
import tank from '@inglorious/engine/ai/movement/kinematic/tank'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType(),
    ...inputType(),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const { input0, mouse } = instances

        instance.velocity = [0, 0, 0]
        if (input0.left) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (input0.down) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input0.right) {
          instance.velocity[2] = instance.maxSpeed
        }
        if (input0.up) {
          instance.velocity[0] = instance.maxSpeed
        }

        merge(instance, face(instance, mouse, { dt }))
        merge(instance, tank(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),
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
        maxAngularSpeed: 2 * pi(),
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
