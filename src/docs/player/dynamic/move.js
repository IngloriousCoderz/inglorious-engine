import move from '@inglorious/engine/player/dynamic/move.js'
import { clampToBounds } from '@inglorious/game/bounds.js'
import { enableCharacter } from '@inglorious/game/decorators/character.js'
import * as Input from '@inglorious/game/types/input.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...Input.type(),

    character: [
      enableCharacter(),
      {
        'game:update'(instance, event, { dt, config, instances }) {
          const { input0 } = instances

          instance.acceleration = [0, 0, 0]
          if (input0.left) {
            instance.acceleration[0] = -instance.maxAcceleration
          }
          if (input0.down) {
            instance.acceleration[2] = -instance.maxAcceleration
          }
          if (input0.right) {
            instance.acceleration[0] = instance.maxAcceleration
          }
          if (input0.up) {
            instance.acceleration[2] = instance.maxAcceleration
          }

          if (input0.leftRight != null) {
            instance.acceleration[0] +=
              input0.leftRight * instance.maxAcceleration
          }
          if (input0.upDown != null) {
            instance.acceleration[2] +=
              -input0.upDown * instance.maxAcceleration
          }

          merge(instance, move(instance, { dt }))
          clampToBounds(instance, config.bounds)
        },
      },
    ],
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
        Axis0: 'leftRight',
        Axis1: 'upDown',
      }),

      character: {
        id: 'character',
        type: 'character',
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
      },
    },
  },
}
