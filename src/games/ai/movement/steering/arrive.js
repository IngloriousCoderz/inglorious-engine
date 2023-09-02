import arrive from '../../../../ai/movement/steering/arrive'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'
import * as vectors from '../../../../utils/vectors'

const DEFAULT_VALUES = {
  targetRadius: 1,
  slowRadius: 100,
  timeToTarget: 0.1,
}

export default {
  bounds: [0, 0, 800, 600],
  types: {
    game: {
      'targetRadius:change'(_, event, { instances }) {
        instances.form.fields.targetRadius.value = event.payload
      },
      'slowRadius:change'(_, event, { instances }) {
        instances.form.fields.slowRadius.value = event.payload
      },
      'timeToTarget:change'(_, event, { instances }) {
        instances.form.fields.timeToTarget.value = event.payload
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

        instance = {
          ...instance,
          ...arrive(instance, target, {
            ...options,
            targetRadius: instances.form.fields.targetRadius.value,
            slowRadius: instances.form.fields.slowRadius.value,
            timeToTarget: instances.form.fields.timeToTarget.value,
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
        maxSpeed: 250,
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },

      form: {
        type: 'form',
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
        fields: {
          targetRadius: {
            type: 'field',
            label: 'Target Radius',
            inputType: 'number',
            defaultValue: DEFAULT_VALUES.targetRadius,
          },
          slowRadius: {
            type: 'field',
            label: 'Slow Radius',
            inputType: 'number',
            defaultValue: DEFAULT_VALUES.slowRadius,
          },
          timeToTarget: {
            type: 'field',
            label: 'Time To Target',
            inputType: 'number',
            step: 0.1,
            defaultValue: DEFAULT_VALUES.timeToTarget,
          },
        },
      },
    },
  },
}
