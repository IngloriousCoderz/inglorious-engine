import move from '@inglorious/engine/ai/movement/kinematic/move'
import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...keyboardType(),

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
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

        merge(instance, move(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...keyboardInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
