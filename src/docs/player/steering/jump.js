import { inputInstance, inputType } from '@inglorious/engine/input'
import move from '@inglorious/engine/player/steering/move'
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
          'game:update'(instance, event, { dt, instances }) {
            const { input0 } = instances

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

            act(instance, event, { dt, instances })
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
          'game:update'(instance, event, { dt, instances }) {
            act(instance, event, { dt, instances })
          },
        },
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowUp: 'up',
        Space: 'jump',
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

  merge(instance, applyGravity(instance, options))

  if (instance.py <= 0) {
    instance.vy = 0
    instance.py = 0
    instance.state = 'notJumping'
  }
}
