import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/match-velocity'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...inputType({
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowUp: 'up',
    }),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { fields } = instances.parameters.groups.matchVelocity

        const { input0 } = instances

        const SPEED = instance.maxSpeed

        const target = { velocity: [0, 0, 0] }
        if (input0.left) {
          target.velocity[0] = -SPEED
        }
        if (input0.down) {
          target.velocity[2] = -SPEED
        }
        if (input0.right) {
          target.velocity[0] = SPEED
        }
        if (input0.up) {
          target.velocity[2] = SPEED
        }

        merge(
          instance,
          matchVelocity(instance, target, {
            dt,
            timeToTarget: fields.timeToTarget.value,
          })
        )

        clampToBounds(instance, config.bounds)
      },
    },

    form: {
      'field:change'(instance, event) {
        const { id, value } = event.payload
        instance.groups.matchVelocity.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      ...inputInstance(),

      character: {
        type: 'character',
        maxAcceleration: 1000,
        maxSpeed: 250,
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          matchVelocity: {
            title: 'Match Velocity',
            fields: {
              timeToTarget: {
                label: 'Time To Target',
                inputType: 'number',
                step: 0.1,
                defaultValue: DEFAULT_TIME_TO_TARGET,
              },
            },
          },
        },
      },
    },
  },
}
