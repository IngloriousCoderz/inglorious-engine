import engine from '../../../../engine'
import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '../../../../engine/ai/movement/steering/align'
import lookWhereYoureGoing from '../../../../engine/ai/movement/steering/look-where-youre-going'
import {
  keyboardInstance,
  keyboardType,
} from '../../../../engine/input/keyboard'
import { clampToBounds } from '../../../../utils/characters'
import * as math from '../../../../utils/math'
import * as vectors from '../../../../utils/vectors'

export default {
  bounds: [0, 0, 800, 600],

  types: {
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
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const { fields } = instances.parameters.groups.align

        const { keyboard = {} } = instances

        const target = { velocity: [0, 0, 0] }
        if (keyboard.ArrowLeft) {
          target.velocity[0] = -1
        }
        if (keyboard.ArrowUp) {
          target.velocity[2] = -1
        }
        if (keyboard.ArrowRight) {
          target.velocity[0] = 1
        }
        if (keyboard.ArrowDown) {
          target.velocity[2] = 1
        }

        instance = {
          ...instance,
          velocity: target.velocity,
          position: vectors.sum(instance.position, target.velocity),
        }

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
      keyboard: keyboardInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
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
