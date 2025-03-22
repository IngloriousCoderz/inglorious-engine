import { enableCharacter } from '@inglorious/game/decorators/character.js'
import * as Fps from '@inglorious/game/types/fps.js'
import * as Mouse from '@inglorious/game/types/mouse.js'

export default {
  types: {
    mouse: Mouse.type(),

    fps: Fps.type(),

    character: [
      enableCharacter(),
      {
        'game:update'(instance, event, { instances }) {
          const { mouse } = instances
          instance.position = mouse.position
        },
      },
    ],
  },

  state: {
    instances: {
      mouse: { id: 'mouse', type: 'mouse', position: [400, 0, 300] },

      fps: {
        id: 'fps',
        type: 'fps',
        position: [0, 0, 600],
      },

      character: {
        id: 'character',
        type: 'character',
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },
    },
  },
}
