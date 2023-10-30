import face from '@inglorious/engine/ai/movement/kinematic/face'
import tank from '@inglorious/engine/ai/movement/steering/tank'
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

        instance.acceleration = [0, 0, 0]
        if (input0.left) {
          instance.acceleration[2] = -instance.maxAcceleration
        }
        if (input0.down) {
          instance.acceleration[0] = -instance.maxAcceleration
        }
        if (input0.right) {
          instance.acceleration[2] = instance.maxAcceleration
        }
        if (input0.up) {
          instance.acceleration[0] = instance.maxAcceleration
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
        maxAngularAcceleration: 1000,
        maxAcceleration: 1000,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      },
    },
  },
}
