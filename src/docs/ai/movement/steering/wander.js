import wander, {
  DEFAULT_WANDER_OFFSET,
  DEFAULT_WANDER_RADIUS,
} from '@inglorious/engine/ai/movement/steering/wander'
import { flip } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    game: {
      'wanderOffset:change'(instance, event, { instances }) {
        instances.parameters.groups.wander.fields.wanderOffset.value =
          event.payload
      },
      'wanderRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.wander.fields.wanderRadius.value =
          event.payload
      },
    },

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

    form: {},
  },

  state: {
    instances: {
      character: {
        type: 'character',
        maxAcceleration: 10,
        maxSpeed: 2,
        maxRotation: pi() / 4,
        orientation: 0,
        velocity: [0, 0, 0],
        position: [0, 0, 300],
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
