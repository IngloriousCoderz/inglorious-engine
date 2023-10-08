import wander, {
  DEFAULT_WANDER_OFFSET,
  DEFAULT_WANDER_RADIUS,
} from '@ezpz/engine/ai/movement/steering/wander'
import { flip } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    game: {
      'wanderOffset:change'(_, event, { instances }) {
        instances.parameters.groups.wander.fields.wanderOffset.value =
          event.payload
      },
      'wanderRadius:change'(_, event, { instances }) {
        instances.parameters.groups.wander.fields.wanderRadius.value =
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
        const { fields } = instances.parameters.groups.wander

        merge(
          instance,
          wander(instance, {
            elapsed,
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
      debug: {
        type: 'fps',
        value: 0,
      },

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
        position: [800 - 352, 0, 0],
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
