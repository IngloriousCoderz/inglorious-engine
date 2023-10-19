import arrive from '@inglorious/engine/ai/movement/kinematic/arrive'
import wander from '@inglorious/engine/ai/movement/kinematic/wander'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds, flip } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { length } from '@inglorious/utils/math/linear-algebra/vector'
import { subtract } from '@inglorious/utils/math/linear-algebra/vectors'
import { pi } from '@inglorious/utils/math/trigonometry'

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
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      character: {
        type: 'character',
        state: 'meandering',
        maxSpeed: 250,
        maxRotation: pi() / 4,
        orientation: 0,
        position: [400, 0, 300],
      },
    },
  },
}
