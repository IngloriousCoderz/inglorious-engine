import move from '@ezpz/engine/ai/movement/kinematic/move'
import { keyboardInstance, keyboardType } from '@ezpz/engine/input/keyboard'
import { clampToBounds } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    keyboard: keyboardType(),

    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { elapsed, config, instances }) {
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

        merge(instance, move(instance, { elapsed }))

        clampToBounds(instance, config.bounds)
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
        maxSpeed: 250,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
