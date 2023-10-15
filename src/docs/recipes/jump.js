import jump from '@ezpz/engine/ai/movement/steering/jump'
import move from '@ezpz/engine/ai/movement/steering/move'
import { keyboardInstance, keyboardType } from '@ezpz/engine/input/keyboard'
import { merge } from '@ezpz/utils/data-structures/objects'
import { applyGravity } from '@ezpz/utils/physics'

export default {
  types: {
    keyboard: keyboardType(),

    debug: {},

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

            instance.acceleration = [0, 0, 0]
            if (keyboard.ArrowLeft) {
              instance.acceleration[0] = -instance.maxAcceleration
            }
            if (keyboard.ArrowRight) {
              instance.acceleration[0] = instance.maxAcceleration
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

      debug: {
        type: 'debug',
        position: [600, 0, 600],
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

function act(instance, event, { dt }) {
  // const { keyboard } = instances

  // instance.acceleration = [0, 0, 0]
  // if (keyboard.ArrowLeft) {
  //   instance.acceleration[0] = -instance.maxAcceleration
  // }
  // if (keyboard.ArrowRight) {
  //   instance.acceleration[0] = instance.maxAcceleration
  // }

  merge(instance, move(instance, { dt }))

  applyGravity(instance, { dt })

  if (instance.py <= 0) {
    // instance.ay = 0
    instance.vy = 0
    instance.py = 0
    instance.state = 'notJumping'
  }
}
