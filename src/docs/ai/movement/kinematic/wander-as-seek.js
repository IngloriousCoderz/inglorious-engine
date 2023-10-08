import wanderAsSeek, {
  DEFAULT_WANDER_RADIUS,
} from '@ezpz/engine/ai/movement/kinematic/wander-as-seek'
import { flip } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    game: {
      'wanderRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.wanderAsSeek.fields.wanderRadius.value =
          event.payload
      },
    },

    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { elapsed, config, instances }) {
        const { fields } = instances.parameters.groups.wanderAsSeek

        merge(
          instance,
          wanderAsSeek(instance, {
            elapsed,
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
      debug: {
        type: 'fps',
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
