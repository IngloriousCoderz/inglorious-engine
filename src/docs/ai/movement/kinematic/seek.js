import seek from '@inglorious/engine/ai/movement/kinematic/seek.js'
import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, instances }) {
        const target = instances.mouse

        merge(instance, seek(instance, target, { dt }))
      },
    }),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),

      character: Character.instance({
        id: 'character',
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
