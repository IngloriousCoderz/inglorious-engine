import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import * as Fps from '@inglorious/ui/canvas/fps.js'

export default {
  types: {
    mouse: Mouse.type(),

    fps: Fps.type(),

    character: Character.type({
      'game:update'(instance, event, { instances }) {
        const { mouse } = instances
        instance.position = mouse.position
      },
    }),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),

      fps: Fps.instance(),

      character: Character.instance({
        id: 'character',
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      }),
    },
  },
}
