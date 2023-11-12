import arrive from '@inglorious/engine/ai/movement/kinematic/arrive.js'
import wander from '@inglorious/engine/ai/movement/kinematic/wander.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import character from '@inglorious/utils/canvas/character.js'
import { clampToBounds, flip } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'
import { length } from '@inglorious/utils/math/linear-algebra/vector.js'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors.js'
import { pi } from '@inglorious/utils/math/trigonometry.js'

export default {
  types: {
    ...mouseType(),

    character: {
      states: {
        meandering: {
          'game:update'(instance, event, { dt, config, instances }) {
            const target = instances.mouse

            merge(instance, wander(instance, { dt }))
            flip(instance, config.bounds)

            if (length(subtract(instance.position, target.position)) < 200) {
              instance.state = 'hunting'
            }
          },
        },

        hunting: {
          'game:update'(instance, event, { dt, config, instances }) {
            const target = instances.mouse

            merge(instance, arrive(instance, target, { dt }))
            clampToBounds(instance, config.bounds)

            if (length(subtract(instance.position, target.position)) >= 200) {
              instance.state = 'meandering'
            }
          },
        },
      },

      draw: character,
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      character: {
        type: 'character',
        state: 'meandering',
        maxSpeed: 250,
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },
    },
  },
}
