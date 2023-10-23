import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/align'
import lookWhereYoureGoing from '@inglorious/engine/ai/movement/steering/look-where-youre-going'
import { inputInstances, inputType } from '@inglorious/engine/input'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { pi } from '@inglorious/utils/math/trigonometry'

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
        const { fields } = instances.parameters.groups.lookWhereYoureGoing

        const { input0 } = instances

        const target = { velocity: [0, 0, 0] }
        if (input0.left) {
          target.velocity[0] = -1
        }
        if (input0.down) {
          target.velocity[2] = -1
        }
        if (input0.right) {
          target.velocity[0] = 1
        }
        if (input0.up) {
          target.velocity[2] = 1
        }

        merge(instance, {
          velocity: target.velocity,
          position: sum(instance.position, target.velocity),
        })

        merge(
          instance,
          lookWhereYoureGoing(instance, {
            dt,
            targetRadius: fields.targetRadius.value,
            slowRadius: fields.slowRadius.value,
            timeToTarget: fields.timeToTarget.value,
          })
        )

        clampToBounds(instance, config.bounds)
      },
    },

    form: {
      'field:change'(instance, event) {
        const { id, value } = event.payload
        instance.groups.lookWhereYoureGoing.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      ...inputInstances(),

      character: {
        type: 'character',
        maxAngularAcceleration: 1000,
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          lookWhereYoureGoing: {
            title: "Look Where You're Going",
            fields: {
              targetRadius: {
                label: 'Target Radius',
                inputType: 'number',
                defaultValue: DEFAULT_TARGET_RADIUS,
              },
              slowRadius: {
                label: 'Slow Radius',
                inputType: 'number',
                defaultValue: DEFAULT_SLOW_RADIUS,
              },
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
