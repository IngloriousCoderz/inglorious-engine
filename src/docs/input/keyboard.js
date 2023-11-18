import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard.js'
import move from '@inglorious/engine/player/kinematic/move.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { fpsInstance, fpsType } from '@inglorious/ui/canvas/fps.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...keyboardType(),

    ...fpsType(),

    ...Character.type({
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
    }),
  },

  state: {
    instances: {
      ...keyboardInstance({
        ArrowLeft: 'left',
        ArrowDown: 'down',
        ArrowRight: 'right',
        ArrowUp: 'up',
      }),

      ...fpsInstance(),

      ...Character.instance({
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
