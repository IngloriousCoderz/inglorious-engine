import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableClampToBounds } from '@inglorious/game/decorators/clamp-to-bounds.js'
import {
  createControls,
  enableControls,
} from '@inglorious/game/decorators/input/controls.js'
import { enableMove } from '@inglorious/game/decorators/move/kinematic.js'

export default {
  types: {
    ...enableControls(),

    stats: {},

    character: [enableCharacter(), enableMove(), enableClampToBounds()],
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
        Btn12: 'up',
        Btn13: 'down',
        Btn14: 'left',
        Btn15: 'right',
        Btn0: 'jump',
        Axis0: 'leftRight',
        Axis1: 'upDown',
      }),

      stats: {
        type: 'stats',
        position: [600, 0, 600],
        target: 'character',
      },

      character: {
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
        maxJump: 100,
        maxLeap: 100,
      },
    },
  },
}
