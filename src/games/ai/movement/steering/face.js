import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '../../../../ai/movement/steering/align'
import face from '../../../../ai/movement/steering/face'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'
import * as math from '../../../../utils/math'
import * as vectors from '../../../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    game: {
      'targetRadius:change'(_, event, { instances }) {
        instances.parameters.groups.face.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(_, event, { instances }) {
        instances.parameters.groups.face.fields.slowRadius.value = event.payload
      },
      'timeToTarget:change'(_, event, { instances }) {
        instances.parameters.groups.face.fields.timeToTarget.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    cursor: {
      'mouse:move'(instance, { payload }) {
        instance.position = vectors.subtract(payload, [16, 0, 16])

        clampToBounds(instance, engine.config.bounds)
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.cursor
        const { fields } = instances.parameters.groups.face

        instance = {
          ...instance,
          ...face(instance, target, {
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
      debug: {
        type: 'elapsed',
        value: 0,
      },

      cursor: {
        type: 'cursor',
        position: [0, 0, 0],
        orientation: 0,
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
