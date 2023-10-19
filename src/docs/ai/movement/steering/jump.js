import jump from '@inglorious/engine/ai/movement/steering/jump'
import move from '@inglorious/engine/ai/movement/steering/move'
import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import { merge } from '@inglorious/utils/data-structures/objects'
import { applyGravity } from '@inglorious/utils/physics/gravity'

export default {
  types: {
    keyboard: keyboardType(),

    stats: {},

    character: {
      states: {
        notJumping: {
          'game:update'(instance, event, { dt, instances }) {
            const { keyboard } = instances

            instance.acceleration = [0, 0, 0]
            if (keyboard.ArrowLeft) {
              instance.acceleration[0] = -instance.maxAcceleration
            }
            if (keyboard.ArrowRight) {
              instance.acceleration[0] = instance.maxAcceleration
            }
            if (keyboard.ArrowDown) {
              instance.acceleration[2] = -instance.maxAcceleration
            }
            if (keyboard.ArrowUp) {
              instance.acceleration[2] = instance.maxAcceleration
            }

            act(instance, event, { dt, instances })
          },

          'keyboard:keyDown'(instance, event, { dt }) {
            if (event.payload === 'Space') {
              instance.state = 'jumping'
              jump(instance, { dt })
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
      keyboard: keyboardInstance(),

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
