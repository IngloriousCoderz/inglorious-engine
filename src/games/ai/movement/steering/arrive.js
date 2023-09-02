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
      'targetRadiusInput:change'(_, event, { instances }) {
        instances.targetRadiusInput.value = event.payload
      },
      'targetRadiusResetButton:click'(_, event, { instances }) {
        instances.targetRadiusInput.value = DEFAULT_VALUES.targetRadius
      },
      'slowRadiusInput:change'(_, event, { instances }) {
        instances.slowRadiusInput.value = event.payload
      },
      'slowRadiusResetButton:click'(_, event, { instances }) {
        instances.slowRadiusInput.value = DEFAULT_VALUES.slowRadius
      },
      'timeToTargetInput:change'(_, event, { instances }) {
        instances.timeToTargetInput.value = event.payload
      },
      'timeToTargetResetButton:click'(_, event, { instances }) {
        instances.timeToTargetInput.value = DEFAULT_VALUES.timeToTarget
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

        const targetRadiusInput = instances.targetRadiusInput
        const slowRadiusInput = instances.slowRadiusInput
        const timeToTargetInput = instances.timeToTargetInput

        instance = {
          ...instance,
          ...arrive(instance, target, {
            ...options,
            targetRadius: targetRadiusInput?.value,
            slowRadius: slowRadiusInput?.value,
            timeToTarget: timeToTargetInput?.value,
          }),
        }

        clampToBounds(instance, engine.config.bounds)

        return instance
      },
    },
    label: {},
    input: {},
    button: {},
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

      targetRadiusLabel: {
        type: 'label',
        value: 'Target Radius',
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
      },
      targetRadiusInput: {
        type: 'input',
        inputType: 'number',
        value: DEFAULT_VALUES.targetRadius,
        position: [800 - 177 - 51, 0, 0 * 21],
      },
      targetRadiusResetButton: {
        type: 'button',
        label: 'Reset',
        position: [800 - 51, 0, 0 * 21],
      },

      slowRadiusLabel: {
        type: 'label',
        value: 'Slow Radius',
        position: [800 - 177 - 51 - 100, 0, 1 * 21],
      },
      slowRadiusInput: {
        type: 'input',
        inputType: 'number',
        value: DEFAULT_VALUES.slowRadius,
        position: [800 - 177 - 51, 0, 1 * 21],
      },
      slowRadiusResetButton: {
        type: 'button',
        label: 'Reset',
        position: [800 - 51, 0, 1 * 21],
      },

      timeToTargetLabel: {
        type: 'label',
        value: 'Time To Target',
        position: [800 - 177 - 51 - 100, 0, 2 * 21],
      },
      timeToTargetInput: {
        type: 'input',
        inputType: 'number',
        value: DEFAULT_VALUES.timeToTarget,
        step: 0.1,
        position: [800 - 177 - 51, 0, 2 * 21],
      },
      timeToTargetResetButton: {
        type: 'button',
        label: 'Reset',
        position: [800 - 51, 0, 2 * 21],
      },
    },
  },
}
