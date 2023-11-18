import flee from '@inglorious/engine/ai/movement/dynamic/flee.js'
import * as Mouse from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    mouse: Mouse.type(),

    character: Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse

        merge(instance, flee(instance, target, { dt }))

        clampToBounds(instance, config.bounds)
      },
    }),
  },

  state: {
    instances: {
      mouse: Mouse.instance(),

      character: Character.instance({
        id: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        position: [400, 0, 300],
      }),
    },
  },
}
