import { inputInstance, inputType } from '@inglorious/engine'
import align, {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/kinematic/align'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character/bounds'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'
import { clamp } from '@inglorious/utils/math/trigonometry/rng/numbers'

export default {
  types: {
    ...mouseType({
      'field:change'(instance, event) {
        const { id, value } = event.payload
        if (id === 'targetOrientation') {
          instance.orientation = -value * pi()
        }
      },

      'game:update'(instance, event, { instances }) {
        const { input0 } = instances

        if (input0.left || input0.up) {
          instance.orientation += 0.1
        } else if (input0.right || input0.down) {
          instance.orientation -= 0.1
        }
        instance.orientation = clamp(instance.orientation, -pi(), pi())
      },
    }),

    ...inputType(),

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.align

        merge(
          instance,
          align(instance, target, {
            dt,
            targetRadius: fields.targetRadius.value,
            timeToTarget: fields.timeToTarget.value,
          })
        )

        clampToBounds(instance, config.bounds)
      },
    },

    form: {
      'field:change'(instance, event) {
        const { id, value } = event.payload
        instance.groups.align.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      ...mouseInstance(),
      ...inputInstance(0, {
        ArrowLeft: 'left',
        ArrowRight: 'right',
        ArrowDown: 'down',
        ArrowUp: 'up',
      }),

      character: {
        type: 'character',
        maxAngularSpeed: pi() / 4,
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          align: {
            title: 'Kinematic Align',
            fields: {
              targetRadius: {
                label: 'Target Radius',
                inputType: 'number',
                defaultValue: DEFAULT_TARGET_RADIUS,
              },
              timeToTarget: {
                label: 'Time To Target',
                inputType: 'number',
                step: 0.1,
                defaultValue: DEFAULT_TIME_TO_TARGET,
              },
              targetOrientation: {
                label: 'Target Orientation',
                inputType: 'number',
                step: 0.25,
                min: -1,
                max: 1,
                defaultValue: 0,
              },
            },
          },
        },
      },
    },
  },
}
