import wanderAsSeek, {
  DEFAULT_WANDER_RADIUS,
} from '@inglorious/engine/ai/movement/kinematic/wander-as-seek'
import { flip } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    game: {
      'wanderRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.wanderAsSeek.fields.wanderRadius.value =
          event.payload
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { fields } = instances.parameters.groups.wanderAsSeek

        merge(
          instance,
          wanderAsSeek(instance, {
            dt,
            wanderRadius: fields.wanderRadius.value,
          })
        )
        flip(instance, config.bounds)
      },
    },

    form: {},
  },

  state: {
    instances: {
      character: {
        type: 'character',
        maxSpeed: 250,
        maxRotation: pi() / 4,
        orientation: 0,
        position: [0, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 352, 0, 600],
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
