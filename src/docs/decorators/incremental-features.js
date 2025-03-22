import { enableCharacter } from '@inglorious/game/decorators/character.js'
import {
  createControls,
  enableControls,
} from '@inglorious/game/decorators/input/controls.js'
import { enableJump } from '@inglorious/game/decorators/jump.js'
import { enableMove } from '@inglorious/game/decorators/move.js'

export default {
  types: {
    ...enableControls(),

    character: [enableCharacter(), enableMove(), enableJump()],
  },

  state: {
    instances: {
      ...createControls(0, {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Space: 'jump',
        KeyW: 'up',
        KeyS: 'down',
        KeyA: 'left',
        KeyD: 'right',
        Btn0: 'jump',
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
        position: [400, 0, 300],
      },
    },
  },
}
