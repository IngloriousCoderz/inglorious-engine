import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/align'
import face from '@inglorious/engine/ai/movement/steering/face'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'
import { pi } from '@inglorious/utils/math/trigonometry'

export default {
  types: {
    ...mouseType(),

    game: {
      'targetRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.face.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.face.fields.slowRadius.value = event.payload
      },
      'timeToTarget:change'(instance, event, { instances }) {
        instances.parameters.groups.face.fields.timeToTarget.value =
          event.payload
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.face

        merge(
          instance,
          face(instance, target, {
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
          face: {
            title: 'Face',
            fields: {
              targetRadius: {
                label: 'Target Radius',
                inputType: 'number',
                step: 0.1,
                defaultValue: DEFAULT_TARGET_RADIUS,
              },
              slowRadius: {
                label: 'Slow Radius',
                inputType: 'number',
                step: 0.1,
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
