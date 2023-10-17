import move from '@inglorious/engine/ai/movement/kinematic/move'
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
        maxSpeed: 250,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
