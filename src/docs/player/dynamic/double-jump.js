import { inputInstance, inputType } from '@inglorious/engine/input'
import move from '@inglorious/engine/player/dynamic/move'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { applyGravity } from '@inglorious/utils/physics/gravity'
import { jump } from '@inglorious/utils/physics/jump'

export default {
  types: {
    ...inputType(),

    stats: {},

    character: {
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
        Axis0: 'leftRight',
        Axis1: 'upDown',
        Btn0: 'jump',
      }),

      stats: {
        type: 'stats',
        position: [600, 0, 600],
        target: 'character',
      },

      character: {
        type: 'character',
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        position: [400, 0, 300],
        maxJump: 100,
        maxLeap: 100,
        state: 'notJumping',
      },
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
