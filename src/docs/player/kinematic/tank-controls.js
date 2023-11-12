import { inputInstance, inputType } from '@inglorious/engine/input.js'
import tank from '@inglorious/engine/player/kinematic/tank.js'
import character from '@inglorious/utils/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...inputType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
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

        if (input0.leftRight != null) {
          instance.orientation +=
            -input0.leftRight * instance.maxAngularSpeed * dt
        }
        if (input0.upDown != null) {
          instance.velocity[0] += -input0.upDown * instance.maxSpeed
        }
        if (input0.strafe != null) {
          instance.velocity[2] += input0.strafe * instance.maxSpeed
        }

        merge(instance, tank(instance, { dt }))
        clampToBounds(instance, config.bounds)
      },

      draw: character,
    },
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
        Axis0: 'strafe',
        Axis1: 'upDown',
        Axis2: 'leftRight',
      }),

      character: {
        type: 'character',
        maxAngularSpeed: 10,
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
