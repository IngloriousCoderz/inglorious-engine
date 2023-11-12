import { inputInstance, inputType } from '@inglorious/engine'
import face from '@inglorious/engine/ai/movement/kinematic/face'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import tank from '@inglorious/engine/player/dynamic/tank'
import { clampToBounds } from '@inglorious/utils/character/bounds'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType(),
    ...inputType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
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
        clampToBounds(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),
      ...inputInstance(0, {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        KeyW: 'up',
        KeyS: 'down',
        KeyA: 'left',
        KeyD: 'right',
      }),

      character: {
        type: 'character',
        maxAngularAcceleration: 1000,
        maxAngularSpeed: 2 * pi(),
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      },
    },
  },
}
