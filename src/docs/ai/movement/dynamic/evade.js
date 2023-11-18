import evade, {
  DEFAULT_MAX_PREDICTION,
} from '@inglorious/engine/ai/movement/dynamic/evade.js'
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
        const { fields } = instances.parameters.groups.evade

        merge(
          instance,
          evade(instance, target, {
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
        instance.groups.evade.fields[id].value = value
      },
    },
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

      parameters: {
        type: 'form',
        position: [800 - 343, 0, 600],
        groups: {
          evade: {
            title: 'Evade',
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
