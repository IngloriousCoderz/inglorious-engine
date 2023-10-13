import jump from '@ezpz/engine/ai/movement/steering/jump'
import move from '@ezpz/engine/ai/movement/steering/move'
import { keyboardInstance, keyboardType } from '@ezpz/engine/input/keyboard'
import { merge } from '@ezpz/utils/data-structures/objects'
import { applyGravity } from '@ezpz/utils/physics'

export default {
  types: {
    keyboard: keyboardType(),

    character: {
      states: {
        jumping: {
          'game:update'(instance, event, { elapsed, instances }) {
            act(instance, event, { elapsed, instances })
          },
        },

        notJumping: {
          'game:update'(instance, event, { elapsed, instances }) {
            act(instance, event, { elapsed, instances })

            const { keyboard } = instances
            if (keyboard.Space) {
              instance.state = 'jumping'
              jump(instance, { elapsed })
            }
          },
        },
      },
    },
  },

  state: {
    instances: {
      keyboard: keyboardInstance(),

      character: {
        type: 'character',
        maxJumpAcceleration: 250,
        maxJumpSpeed: 250,
        maxAcceleration: 10,
        maxSpeed: 250,
        acceleration: [0, 0, 0],
        velocity: [0, 0, 0],
        position: [400, 300, 0],
        state: 'notJumping',
      },
    },
  },
}

function act(instance, event, { elapsed, instances }) {
  const { keyboard } = instances

  if (keyboard.ArrowLeft) {
    instance.acceleration[0] = -instance.maxAcceleration
  }
  if (keyboard.ArrowRight) {
    instance.acceleration[0] = instance.maxAcceleration
  }

  merge(instance, move(instance, { elapsed }))

  applyGravity(instance)
  if (instance.position[1] <= 300) {
    instance.position[1] = 300
    instance.state = 'notJumping'
  }
}
