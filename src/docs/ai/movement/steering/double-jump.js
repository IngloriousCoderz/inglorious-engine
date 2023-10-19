import jump from '@inglorious/engine/ai/movement/steering/jump'
import move from '@inglorious/engine/ai/movement/steering/move'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { merge } from '@inglorious/utils/data-structures/objects'
import { applyGravity } from '@inglorious/utils/physics/gravity'

export default {
  types: {
    ...inputType({
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowUp: 'up',
      Space: 'jump',
    }),

    stats: {},

    character: {
      states: {
        notJumping: {
          'game:update'(instance, event, { dt, instances }) {
            const { input } = instances

            instance.acceleration = [0, 0, 0]
            if (input.left) {
              instance.acceleration[0] = -instance.maxAcceleration
            }
            if (input.right) {
              instance.acceleration[0] = instance.maxAcceleration
            }
            if (input.down) {
              instance.acceleration[2] = -instance.maxAcceleration
            }
            if (input.up) {
              instance.acceleration[2] = instance.maxAcceleration
            }

            act(instance, event, { dt, instances })
          },

          'input:press'(instance, event, { dt }) {
            if (event.payload === 'jump') {
              instance.state = 'jumping'
              jump(instance, { dt })
            }
          },
        },

        jumping: {
          'game:update'(instance, event, { dt, instances }) {
            act(instance, event, { dt, instances })
          },

          'input:press'(instance, event, { dt }) {
            if (event.payload === 'jump') {
              instance.state = 'doubleJumping'
              jump(instance, { dt })
            }
          },
        },

        doubleJumping: {
          'game:update'(instance, event, { dt, instances }) {
            act(instance, event, { dt, instances })
          },
        },
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(),

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
        acceleration: [0, 0, 0],
        velocity: [0, 0, 0],
        position: [400, 0, 300],
        maxJump: 100,
        maxLeap: 100,
        ay: 0,
        vy: 0,
        py: 0,
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
