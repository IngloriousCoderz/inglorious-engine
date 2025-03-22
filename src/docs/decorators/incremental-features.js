import { enableCharacter } from '@inglorious/game/decorators/character'
import { enableInput } from '@inglorious/game/decorators/input.js'
import { enableJump } from '@inglorious/game/decorators/jump.js'
import * as Input from '@inglorious/game/types/input.js'

export default {
  types: {
    ...Input.type(),

    character: [enableCharacter(), enableInput(), enableJump()],
  },

  state: {
    instances: {
      ...Input.instance(0, {
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
