import matchVelocity from '@ezpz/engine/ai/movement/steering/match-velocity'
import { keyboardInstance, keyboardType } from '@ezpz/engine/input/keyboard'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    keyboard: keyboardType(),

    fps: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { elapsed, instances }) {
        const { keyboard } = instances

        const SPEED = 5

        const target = { velocity: [0, 0, 0] }
        if (keyboard.ArrowLeft) {
          target.velocity[0] = -SPEED
        }
        if (keyboard.ArrowUp) {
          target.velocity[2] = -SPEED
        }
        if (keyboard.ArrowRight) {
          target.velocity[0] = SPEED
        }
        if (keyboard.ArrowDown) {
          target.velocity[2] = SPEED
        }

        merge(instance, matchVelocity(instance, target, { elapsed }))
      },
    },
  },

  state: {
    instances: {
      keyboard: keyboardInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
