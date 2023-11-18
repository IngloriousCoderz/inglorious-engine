import * as Gamepad from '@inglorious/engine/input/gamepad.js'
import move from '@inglorious/engine/player/kinematic/move.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import * as Fps from '@inglorious/ui/canvas/fps.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    gamepad: Gamepad.type(),

    fps: Fps.type(),

    character: Character.type({
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
    }),
  },

  state: {
    instances: {
      gamepad0: Gamepad.instance(0, {
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
        Axis1: 'upDown',
      }),

      fps: Fps.instance(),

      character: Character.instance({
        id: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
