import wander, {
  DEFAULT_WANDER_OFFSET,
  DEFAULT_WANDER_RADIUS,
} from '@inglorious/engine/ai/movement/steering/wander'
import { flip } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { fields } = instances.parameters.groups.wander

        merge(
          instance,
          wander(instance, {
            dt,
            wanderOffset: fields.wanderOffset.value,
            wanderRadius: fields.wanderRadius.value,
          })
        )
        flip(instance, config.bounds)
      },
    },

    form: {
      'field:change'(instance, event) {
        const { id, value } = event.payload
        instance.groups.wander.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      character: {
        type: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        maxRotation: pi() / 4,
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 352, 0, 600],
        groups: {
          wander: {
            title: 'Steering Wander',
            fields: {
              wanderOffset: {
                label: 'Wander Offset',
                inputType: 'number',
                defaultValue: DEFAULT_WANDER_OFFSET,
              },
              wanderRadius: {
                label: 'Wander Radius',
                inputType: 'number',
                step: 0.1,
                defaultValue: DEFAULT_WANDER_RADIUS,
              },
            },
          },
        },
      },
    },
  },
}
