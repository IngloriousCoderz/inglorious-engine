import pursue, {
  DEFAULT_MAX_PREDICTION,
} from '@inglorious/engine/ai/movement/dynamic/pursue.js'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse.js'
import character from '@inglorious/utils/canvas/character.js'
import { clampToBounds } from '@inglorious/utils/character/bounds.js'
import { merge } from '@inglorious/utils/data-structures/objects.js'

export default {
  types: {
    ...mouseType(),

    character: {
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

      draw: character,
    },

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

      character: {
        type: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        position: [400, 0, 300],
      },

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
