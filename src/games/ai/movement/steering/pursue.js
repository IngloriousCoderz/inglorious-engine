import pursue, {
  DEFAULT_MAX_PREDICTION,
} from '../../../../ai/movement/steering/pursue'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'
import * as vectors from '../../../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],
  types: {
    game: {
      'maxPrediction:change'(_, event, { instances }) {
        instances.parameters.groups.pursue.fields.maxPrediction.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    cursor: {
      'mouse:move'(instance, { payload }) {
        instance.position = vectors.subtract(payload, [16, 0, 16])

        clampToBounds(instance, engine.config.bounds)
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.cursor
        const { fields } = instances.parameters.groups.pursue

        instance = {
          ...instance,
          ...pursue(instance, target, {
            ...options,
            maxPrediction: fields.maxPrediction.value,
          }),
        }

        clampToBounds(instance, engine.config.bounds)

        return instance
      },
    },

    form: {},
  },
  state: {
    instances: {
      debug: {
        type: 'elapsed',
        value: 0,
      },

      cursor: {
        type: 'cursor',
        velocity: [0, 0, 0],
        position: [0, 0, 0],
      },

      character: {
        type: 'character',
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
        groups: {
          pursue: {
            title: 'Pursue',
            fields: {
              maxPrediction: {
                label: 'Max Prediction',
                inputType: 'number',
                defaultValue: DEFAULT_MAX_PREDICTION,
              },
            },
          },
        },
      },
    },
  },
}
