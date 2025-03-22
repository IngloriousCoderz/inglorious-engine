import { enableCharacter } from '@inglorious/game/decorators/character.js'
import { enableFps } from '@inglorious/game/decorators/fps.js'
import { enableMouse } from '@inglorious/game/decorators/input/mouse.js'

export default {
  types: {
    mouse: [enableMouse()],

    fps: [enableFps()],

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
