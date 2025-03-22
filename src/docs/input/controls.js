import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableFps } from '@inglorious/game/decorators/fps.js'
import {
  createControls,
  enableControls,
} from '@inglorious/game/decorators/input/controls.js'
import { enableMove } from '@inglorious/game/decorators/move.js'

export default {
  types: {
    ...enableControls(),

    fps: [enableFps()],

    character: [enableCharacter(), enableMove()],
  },

  state: {
    instances: {
      ...createControls(0, {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        KeyW: 'up',
        KeyS: 'down',
        KeyA: 'left',
        KeyD: 'right',
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
        Axis1: 'upDown',
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
