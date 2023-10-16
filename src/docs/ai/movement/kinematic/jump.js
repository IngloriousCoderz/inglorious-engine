import move from '@inglorious/engine/ai/movement/kinematic/move'
import jump from '@inglorious/engine/ai/movement/steering/jump'
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
        jumping: {
          'game:update'(instance, event, { dt, instances }) {
            act(instance, event, { dt, instances })
          },
        },

        notJumping: {
          'game:update'(instance, event, { dt, instances }) {
            const { keyboard } = instances

            instance.velocity = [0, 0, 0]
            if (keyboard.ArrowLeft) {
              instance.velocity[0] = -instance.maxSpeed
            }
            if (keyboard.ArrowDown) {
              instance.velocity[2] = -instance.maxSpeed
            }
            if (keyboard.ArrowRight) {
              instance.velocity[0] = instance.maxSpeed
            }
            if (keyboard.ArrowUp) {
              instance.velocity[2] = instance.maxSpeed
            }

            act(instance, event, { dt, instances })

            if (keyboard.Space) {
              instance.state = 'jumping'
              jump(instance, { dt })
            }
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
        maxSpeed: 250,
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
