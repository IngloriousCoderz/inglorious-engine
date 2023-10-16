import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/align'
import lookWhereYoureGoing from '@inglorious/engine/ai/movement/steering/look-where-youre-going'
import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { sum } from '@inglorious/utils/math/linear-algebra/vectors'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    keyboard: keyboardType(),

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
    },

    fps: {
      'game:update'(instance, event, { dt }) {
        instance.value = dt
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { fields } = instances.parameters.groups.align

        const { keyboard = {} } = instances

        const target = { velocity: [0, 0, 0] }
        if (keyboard.ArrowLeft) {
          target.velocity[0] = -1
        }
        if (keyboard.ArrowDown) {
          target.velocity[2] = -1
        }
        if (keyboard.ArrowRight) {
          target.velocity[0] = 1
        }
        if (keyboard.ArrowUp) {
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

    form: {},
  },

  state: {
    instances: {
      keyboard: keyboardInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxRotation: pi() / 4,
        maxAngularAcceleration: 10,
        velocity: [0, 0, 0],
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
            },
          },
        },
      },
    },
  },
}
