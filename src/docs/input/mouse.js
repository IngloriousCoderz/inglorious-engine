import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { fpsInstance, fpsType } from '@inglorious/ui/canvas/fps.js'

export default {
  types: {
    ...mouseType(),

    ...fpsType(),

    ...Character.type({
      'game:update'(instance, event, { instances }) {
        const { mouse } = instances
        instance.position = mouse.position
      },
    }),
  },

  state: {
    instances: {
      ...mouseInstance(),

      ...fpsInstance(),

      ...Character.instance({
        id: 'character',
        type: 'character',
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      }),
    },
  },
}
