import move from '@inglorious/engine/player/kinematic/move.js'
import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableFps } from '@inglorious/game/decorators/fps.js'
import {
  createKeyboard,
  enableKeyboard,
} from '@inglorious/game/decorators/input/keyboard.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

const X = 0
const Z = 2

export default {
  types: {
    keyboard: [enableKeyboard()],

    fps: [enableFps()],

    character: [
      enableCharacter(),
      {
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
      },
    ],
  },

  state: {
    instances: {
      keyboard0: createKeyboard(0, {
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
