import pursue, {
  DEFAULT_MAX_PREDICTION,
} from '@inglorious/engine/ai/movement/steering/pursue'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    game: {
      'maxPrediction:change'(instance, event, { instances }) {
        instances.parameters.groups.pursue.fields.maxPrediction.value =
          event.payload
      },
    },

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

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
    },

    form: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxAcceleration: 10,
        velocity: [0, 0, 0],
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
