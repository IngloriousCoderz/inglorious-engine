import pursue, {
  DEFAULT_MAX_PREDICTION,
} from '@inglorious/engine/ai/movement/dynamic/pursue.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import * as Character from '@inglorious/ui/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...mouseType(),

    ...Character.type({
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.pursue

        merge(
          instance,
          pursue(instance, target, {
            dt,
            maxPrediction: fields.maxPrediction.value,
          })
        )

        clampToBounds(instance, config.bounds)
      },
    }),

    form: {
      'field:change'(instance, event) {
        const { id, value } = event.payload
        instance.groups.pursue.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),

      ...Character.instance({
        id: 'character',
        type: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        position: [400, 0, 300],
      }),

      parameters: {
        type: 'form',
        position: [800 - 343, 0, 600],
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
