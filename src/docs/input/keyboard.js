import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import move from '@inglorious/engine/player/kinematic/move'
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
        if (keyboard.left) {
          instance.velocity[0] = -instance.maxSpeed
        }
        if (keyboard.down) {
          instance.velocity[2] = -instance.maxSpeed
        }
        if (keyboard.right) {
          instance.velocity[0] = instance.maxSpeed
        }
        if (keyboard.up) {
          instance.velocity[2] = instance.maxSpeed
        }

        merge(instance, move(instance, { dt }))
      },
    },
  },

  state: {
    instances: {
      ...keyboardInstance({
        ArrowLeft: 'left',
        ArrowDown: 'down',
        ArrowRight: 'right',
        ArrowUp: 'up',
      }),

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
