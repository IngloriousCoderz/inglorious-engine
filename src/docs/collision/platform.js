import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableClampToBounds } from '@inglorious/game/decorators/clamp-to-bounds.js'
import { enableModernControls } from '@inglorious/game/decorators/controls/kinematic/modern.js'
import {
  createControls,
  enableControls,
} from '@inglorious/game/decorators/input/controls.js'
import { enableJump } from '@inglorious/game/decorators/jump.js'
import { enablePlatform } from '@inglorious/game/decorators/platform.js'

export default {
  types: {
    ...enableControls(),

    character: [
      enableCharacter(),
      enableModernControls(),
      enableClampToBounds(),
      enableJump(),
    ],

    platform: [enablePlatform()],
  },

  state: {
    instances: {
      ...createControls(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        Space: 'jump',
        KeyA: 'left',
        KeyD: 'right',
        Btn0: 'jump',
        Btn14: 'left',
        Btn15: 'right',
        Axis0: 'leftRight',
      }),

      character: {
        id: 'character',
        type: 'character',
        position: [200, 0, 62],
        collisions: {
          platform: {
            shape: 'circle',
            radius: 12,
          },
        },
      },
      ground: {
        id: 'ground',
        type: 'platform',
        position: [0, 0, 50],
        size: [800, 50],
        collisions: {
          platform: {
            shape: 'platform',
          },
        },
      },
      platform: {
        id: 'platform',
        type: 'platform',
        position: [600, 0, 100],
        size: [80, 20],
        collisions: {
          platform: {
            shape: 'platform',
          },
        },
      },
    },
  },
}
