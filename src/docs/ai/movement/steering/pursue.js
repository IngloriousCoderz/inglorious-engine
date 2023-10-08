import pursue, {
  DEFAULT_MAX_PREDICTION,
} from '@ezpz/engine/ai/movement/steering/pursue'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    game: {
      'maxPrediction:change'(_, event, { engine }) {
        engine.instances.parameters.groups.pursue.fields.maxPrediction.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { engine, ...options }) {
        const target = engine.instances.mouse
        const { fields } = engine.instances.parameters.groups.pursue

        merge(
          instance,
          pursue(instance, target, {
            ...options,
            maxPrediction: fields.maxPrediction.value,
          })
        )

        clampToBounds(instance, engine.config.bounds)
      },
    },

    form: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'elapsed',
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
        position: [800 - 343, 0, 0],
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
