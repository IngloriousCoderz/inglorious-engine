import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/steering/align'
import face from '@ezpz/engine/ai/movement/steering/face'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    mouse: mouseType(),

    game: {
      'targetRadius:change'(_, event, { engine }) {
        engine.instances.parameters.groups.face.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(_, event, { engine }) {
        engine.instances.parameters.groups.face.fields.slowRadius.value =
          event.payload
      },
      'timeToTarget:change'(_, event, { engine }) {
        engine.instances.parameters.groups.face.fields.timeToTarget.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { engine, ...options }) {
        const target = engine.instances.mouse
        const { fields } = engine.instances.parameters.groups.face

        merge(
          instance,
          face(instance, target, {
            ...options,
            targetRadius: fields.targetRadius.value,
            slowRadius: fields.slowRadius.value,
            timeToTarget: fields.timeToTarget.value,
          })
        )

        clampToBounds(instance, engine.config.bounds)
      },
    },

    form: {},
  },

  state: {
    instances: {
      mouse: mouseInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

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
        position: [800 - 328, 0, 0],
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
