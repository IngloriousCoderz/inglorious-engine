import move from '@inglorious/engine/ai/movement/steering/move'
import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    keyboard: keyboardType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
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

        merge(instance, move(instance, { dt }))

        clampToBounds(instance, config.bounds)
      },
    },
  },

  state: {
    instances: {
      keyboard: keyboardInstance(),

      character: {
        type: 'character',
        maxAcceleration: 500,
        maxSpeed: 250,
        friction: 250,
        acceleration: [0, 0, 0],
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
