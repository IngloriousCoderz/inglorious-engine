import { enableCharacter } from '@inglorious/game/decorators/character.js'
import {
  createControls,
  enableControls,
} from '@inglorious/game/decorators/input/controls.js'
import { enableMove } from '@inglorious/game/decorators/move/kinematic.js'

export default {
  types: {
    ...enableControls(),

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

      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },
    },
  },
}
