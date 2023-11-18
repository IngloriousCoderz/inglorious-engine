import * as Input from '@inglorious/engine/input.js'
import tank from '@inglorious/engine/player/dynamic/tank.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...Input.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const { input0 } = instances

        instance.acceleration = [0, 0, 0]
        if (input0.left) {
          instance.orientation += 0.1
        }
        if (input0.down) {
          instance.acceleration[0] = -instance.maxAcceleration
        }
        if (input0.right) {
          instance.orientation -= 0.1
        }
        if (input0.up) {
          instance.acceleration[0] = instance.maxAcceleration
        }

        if (input0.leftRight != null) {
          instance.orientation +=
            -input0.leftRight * instance.maxAngularSpeed * dt
        }
        if (input0.upDown != null) {
          instance.acceleration[0] += -input0.upDown * instance.maxAcceleration
        }
        if (input0.strafe != null) {
          instance.acceleration[2] += input0.strafe * instance.maxAcceleration
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

      character: Character.instance({
        id: 'character',
        maxAngularSpeed: 10,
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
