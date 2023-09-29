import evade, {
  DEFAULT_MAX_PREDICTION,
} from '../../../../ai/movement/steering/evade'
import engine from '../../../../engine'
import { mouseInstance, mouseType } from '../../../../input/mouse'
import { clampToBounds } from '../../../../utils/characters'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    mouse: mouseType(),

    game: {
      'maxPrediction:change'(_, event, { instances }) {
        instances.parameters.groups.evade.fields.maxPrediction.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.evade

        instance = {
          ...instance,
          ...evade(instance, target, {
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
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
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
