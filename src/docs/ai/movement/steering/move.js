import move from '@ezpz/engine/ai/movement/steering/move'
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

        instance.acceleration = [0, 0, 0]
        if (keyboard.ArrowLeft) {
          instance.acceleration[0] = -instance.maxAcceleration
        }
        if (keyboard.ArrowDown) {
          instance.acceleration[2] = -instance.maxAcceleration
        }
        if (keyboard.ArrowRight) {
          instance.acceleration[0] = instance.maxAcceleration
        }
        if (keyboard.ArrowUp) {
          instance.acceleration[2] = instance.maxAcceleration
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
        maxAcceleration: 10,
        maxSpeed: 250,
        acceleration: [0, 0, 0],
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
