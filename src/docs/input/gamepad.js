import move from '@inglorious/engine/ai/movement/kinematic/move'
import { gamepadInstance, gamepadType } from '@inglorious/engine/input/gamepad'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...gamepadType(),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, instances }) {
        const { gamepad0 } = instances

        instance.velocity = [0, 0, 0]

        if (gamepad0.left) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (gamepad0.down) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (gamepad0.right) {
          instance.velocity[0] = instance.maxSpeed
        }
        if (gamepad0.up) {
          instance.velocity[2] = instance.maxSpeed
        }

        if (gamepad0.leftRight != null) {
          instance.velocity[0] += gamepad0.leftRight * instance.maxSpeed
        }
        if (gamepad0.upDown != null) {
          instance.velocity[2] += -gamepad0.upDown * instance.maxSpeed
        }

        merge(instance, move(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...gamepadInstance(0, {
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
        Axis1: 'upDown',
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
