import align, {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/align'
import { inputInstance, inputType } from '@inglorious/engine/input'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { clamp } from '@inglorious/utils/math/numbers'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType({
      'targetOrientation:change'(instance, event) {
        instance.orientation = -event.payload * pi()
      },

      'game:update'(instance, event, { instances }) {
        const { input } = instances

        if (input.left || input.up) {
          instance.orientation += 0.1
        } else if (input.right || input.down) {
          instance.orientation -= 0.1
        }
        instance.orientation = clamp(instance.orientation, -pi(), pi())
      },
    }),

    ...inputType({
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowDown: 'down',
      ArrowUp: 'up',
    }),

    game: {
      'targetRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.align.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.align.fields.slowRadius.value =
          event.payload
      },
      'timeToTarget:change'(instance, event, { instances }) {
        instances.parameters.groups.align.fields.timeToTarget.value =
          event.payload
      },
      'targetOrientation:change'(instance, event, { instances }) {
        instances.parameters.groups.align.fields.targetOrientation.value =
          event.payload
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.align

        merge(
          instance,
          align(instance, target, {
            dt,
            targetRadius: fields.targetRadius.value,
            slowRadius: fields.slowRadius.value,
            timeToTarget: fields.timeToTarget.value,
          })
        )

        clampToBounds(instance, config.bounds)
      },
    },

    form: {},
  },

  state: {
    instances: {
      ...mouseInstance(),
      ...inputInstance(),

      character: {
        type: 'character',
        maxRotation: pi() / 4,
        maxAngularAcceleration: 10,
        position: [400, 0, 300],
        angularVelocity: 0,
        orientation: 0,
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          align: {
            title: 'Steering Align',
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
