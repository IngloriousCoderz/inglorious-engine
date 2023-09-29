import engine from '../../../../engine'
import align, {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '../../../../engine/ai/movement/steering/align'
import {
  keyboardInstance,
  keyboardType,
} from '../../../../engine/input/keyboard'
import { mouseInstance, mouseType } from '../../../../engine/input/mouse'
import { clampToBounds } from '../../../../utils/characters'
import * as math from '../../../../utils/math'
import { clamp } from '../../../../utils/math/numbers'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    mouse: mouseType({
      'targetOrientation:change'(instance, event) {
        instance.orientation = -event.payload * Math.PI
      },

      'game:update'(instance, _, { instances }) {
        const { keyboard } = instances

        if (keyboard.ArrowLeft || keyboard.ArrowUp) {
          instance.orientation -= 0.1
        } else if (keyboard.ArrowRight || keyboard.ArrowDown) {
          instance.orientation += 0.1
        }
        instance.orientation = clamp(
          instance.orientation,
          -math.pi(),
          math.pi()
        )
      },
    }),

    keyboard: keyboardType(),

    game: {
      'targetRadius:change'(_, event, { instances }) {
        instances.parameters.groups.align.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(_, event, { instances }) {
        instances.parameters.groups.align.fields.slowRadius.value =
          event.payload
      },
      'timeToTarget:change'(_, event, { instances }) {
        instances.parameters.groups.align.fields.timeToTarget.value =
          event.payload
      },
      'targetOrientation:change'(_, event, { instances }) {
        instances.parameters.groups.align.fields.targetOrientation.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.cursor
        const { fields } = instances.parameters.groups.align

        instance = {
          ...instance,
          ...align(instance, target, {
            ...options,
            targetRadius: fields.targetRadius.value,
            slowRadius: fields.slowRadius.value,
            timeToTarget: fields.timeToTarget.value,
          }),
        }

        clampToBounds(instance, engine.config.bounds)

        return instance
      },
    },

    form: {},
  },

  state: {
    instances: {
      cursor: mouseInstance(),
      keyboard: keyboardInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

      character: {
        type: 'character',
        maxRotation: math.pi() / 4,
        maxAngularAcceleration: 10,
        position: [400, 0, 300],
        angularVelocity: 0,
        orientation: 0,
      },

      parameters: {
        type: 'form',
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
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
