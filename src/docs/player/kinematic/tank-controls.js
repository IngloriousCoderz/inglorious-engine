import tank from '@inglorious/engine/player/kinematic/tank.js'
import { clampToBounds } from '@inglorious/game/bounds.js'
import * as Character from '@inglorious/game/types/character.js'
import * as Input from '@inglorious/game/types/input.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...Input.type(),

    character: Character.type({
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
    }),
  },

  state: {
    instances: {
      ...Input.instance(0, {
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
        id: 'character',
        type: 'character',
        maxAngularSpeed: 10,
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
