import move from '@inglorious/engine/player/kinematic/move.js'
import * as Character from '@inglorious/game/types/character.js'
import * as Fps from '@inglorious/game/types/fps.js'
import * as Keyboard from '@inglorious/game/types/keyboard.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

const X = 0
const Z = 2

export default {
  types: {
    keyboard: Keyboard.type(),

    fps: Fps.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, instances }) {
        const { keyboard0 } = instances

        instance.velocity = [0, 0, 0]
        if (keyboard0.left) {
          instance.velocity[X] = -instance.maxSpeed
        }
        if (keyboard0.down) {
          instance.velocity[Z] = -instance.maxSpeed
        }
        if (keyboard0.right) {
          instance.velocity[X] = instance.maxSpeed
        }
        if (keyboard0.up) {
          instance.velocity[Z] = instance.maxSpeed
        }

        merge(instance, move(instance, { dt }))
      },
    }),
  },

  state: {
    instances: {
      keyboard0: Keyboard.instance(0, {
        ArrowLeft: 'left',
        ArrowDown: 'down',
        ArrowRight: 'right',
        ArrowUp: 'up',
      }),

      fps: {
        id: 'fps',
        type: 'fps',
        position: [0, 0, 600],
      },

      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
