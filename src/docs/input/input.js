import { inputInstance, inputType } from '@inglorious/engine/input.js'
import move from '@inglorious/engine/player/kinematic/move.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { fpsInstance, fpsType } from '@inglorious/ui/canvas/fps.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...inputType(),

    ...fpsType(),

    ...Character.type({
      'game:update'(instance, event, { dt, instances }) {
        const { input0 } = instances

        instance.velocity = [0, 0, 0]

        if (input0.left) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (input0.down) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (input0.right) {
          instance.velocity[0] = instance.maxSpeed
        }
        if (input0.up) {
          instance.velocity[2] = instance.maxSpeed
        }

        if (input0.leftRight != null) {
          instance.velocity[0] += input0.leftRight * instance.maxSpeed
        }
        if (input0.upDown != null) {
          instance.velocity[2] += -input0.upDown * instance.maxSpeed
        }

        merge(instance, move(instance, { dt }))
      },
    }),
  },

  state: {
    instances: {
      ...inputInstance(0, {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        KeyW: 'up',
        KeyS: 'down',
        KeyA: 'left',
        KeyD: 'right',
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
        Axis1: 'upDown',
      }),

      ...fpsInstance(),

      ...Character.instance({
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
