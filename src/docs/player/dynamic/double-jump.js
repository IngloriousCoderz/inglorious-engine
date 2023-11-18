import * as Input from '@inglorious/engine/input.js'
import move from '@inglorious/engine/player/dynamic/move.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { applyGravity } from '@inglorious/utils/physics/gravity.js'
import { jump } from '@inglorious/utils/physics/jump.js'

export default {
  types: {
    ...Input.type(),

    stats: {},

    character: Character.type({
      states: {
        notJumping: {
          'game:update'(instance, event, options) {
            const { input0 } = options.instances

            instance.acceleration = [0, 0, 0]
            if (input0.left) {
              instance.acceleration[0] = -instance.maxAcceleration
            }
            if (input0.right) {
              instance.acceleration[0] = instance.maxAcceleration
            }
            if (input0.down) {
              instance.acceleration[2] = -instance.maxAcceleration
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

            act(instance, event, options)
          },

          'input:press'(instance, event, { dt }) {
            const { id, action } = event.payload
            if (id === 0 && action === 'jump') {
              instance.state = 'jumping'
              merge(instance, jump(instance, { dt }))
            }
          },
        },

        jumping: {
          'game:update'(instance, event, options) {
            act(instance, event, options)
          },

          'input:press'(instance, event, { dt }) {
            const { id, action } = event.payload
            if (id === 0 && action === 'jump') {
              instance.state = 'doubleJumping'
              merge(instance, jump(instance, { dt }))
            }
          },
        },

        doubleJumping: {
          'game:update'(instance, event, options) {
            act(instance, event, options)
          },
        },
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
        Space: 'jump',
        KeyW: 'up',
        KeyS: 'down',
        KeyA: 'left',
        KeyD: 'right',
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Btn0: 'jump',
        Axis0: 'leftRight',
        Axis1: 'upDown',
      }),

      stats: {
        type: 'stats',
        position: [600, 0, 600],
        target: 'character',
      },

      character: Character.instance({
        id: 'character',
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
        maxJump: 100,
        maxLeap: 100,
        state: 'notJumping',
      }),
    },
  },
}

function act(instance, event, options) {
  merge(instance, move(instance, options))
  clampToBounds(instance, options.config.bounds)

  merge(instance, applyGravity(instance, options))

  if (instance.py <= 0) {
    instance.vy = 0
    instance.py = 0
    instance.state = 'notJumping'
  }
}
