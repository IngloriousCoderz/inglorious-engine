import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '../../../../ai/movement/steering/align'
import lookWhereYoureGoing from '../../../../ai/movement/steering/look-where-youre-going'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'
import * as math from '../../../../utils/math'
import * as vectors from '../../../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],

  types: {
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
      'key:press'(instance, { payload }) {
        if (['ArrowLeft'].includes(payload)) {
          instance.velocity = [-1, 0, 0]
        } else if (['ArrowRight'].includes(payload)) {
          instance.velocity = [1, 0, 0]
        } else if (['ArrowUp'].includes(payload)) {
          instance.velocity = [0, 0, -1]
        } else if (['ArrowDown'].includes(payload)) {
          instance.velocity = [0, 0, 1]
        }

        instance.position = vectors.sum(instance.position, instance.velocity)
      },

      'game:update'(instance, _, { instances, ...options }) {
        const { fields } = instances.parameters.groups.align

        instance = {
          ...instance,
          ...lookWhereYoureGoing(instance, null, {
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
      },

      character: {
        type: 'character',
        maxRotation: math.pi() / 4,
        maxAngularAcceleration: 10,
        velocity: [0, 0, 0],
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
            },
          },
        },
      },
    },
  },
}
