import evade, {
  DEFAULT_MAX_PREDICTION,
} from '@ezpz/engine/ai/movement/steering/evade'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    game: {
      'maxPrediction:change'(_, event, { instances }) {
        instances.parameters.groups.evade.fields.maxPrediction.value =
          event.payload
      },
    },

    fps: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { elapsed, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.evade

        merge(
          instance,
          evade(instance, target, {
            elapsed,
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
