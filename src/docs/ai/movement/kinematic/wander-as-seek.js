import wanderAsSeek, {
  DEFAULT_WANDER_RADIUS,
} from '@ezpz/engine/ai/movement/kinematic/wander-as-seek'
import { flip } from '@ezpz/utils/characters'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    game: {
      'wanderRadius:change'(instance, event, { engine }) {
        engine.instances.parameters.groups.wanderAsSeek.fields.wanderRadius.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { engine, ...options }) {
        const { fields } = engine.instances.parameters.groups.wanderAsSeek

        Object.assign(
          instance,
          wanderAsSeek(instance, {
            ...options,
            wanderRadius: fields.wanderRadius.value,
          })
        )
        flip(instance, engine.config.bounds)
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

      character: {
        type: 'character',
        maxSpeed: 250,
        maxRotation: pi() / 4,
        orientation: 0,
        position: [0, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 352, 0, 0],
        groups: {
          wanderAsSeek: {
            title: 'Wander As Seek',
            fields: {
              wanderRadius: {
                label: 'Wander Radius',
                inputType: 'number',
                defaultValue: DEFAULT_WANDER_RADIUS,
              },
            },
          },
        },
      },
    },
  },
}
