import arrive, {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/steering/arrive'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    mouse: mouseType(),

    game: {
      'targetRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.arrive.fields.targetRadius.value =
          event.payload
      },
      'slowRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.arrive.fields.slowRadius.value =
          event.payload
      },
      'timeToTarget:change'(instance, event, { instances }) {
        instances.parameters.groups.arrive.fields.timeToTarget.value =
          event.payload
      },
    },

    fps: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { elapsed, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.arrive

        merge(
          instance,
          arrive(instance, target, {
            elapsed,
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
      mouse: mouseInstance(),

      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxAcceleration: 10,
        maxSpeed: 250,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          arrive: {
            title: 'Steering Arrive',
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
