import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/steering/match-velocity'
import { clampToBounds } from '@ezpz/utils/character'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  types: {
    target: {
      'targetSpeed:change'(instance, event) {
        instance.velocity = [event.payload, 0, 0]
      },
    },

    game: {
      'timeToTarget:change'(_, event, { instances }) {
        instances.parameters.groups.matchVelocity.fields.timeToTarget.value =
          event.payload
      },

      'targetSpeed:change'(_, event, { instances }) {
        instances.parameters.groups.matchVelocity.fields.targetSpeed.value =
          event.payload
      },
    },

    fps: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { elapsed, config, instances }) {
        const { target } = instances
        const { fields } = instances.parameters.groups.matchVelocity

        merge(
          instance,
          matchVelocity(instance, target, {
            elapsed,
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
      debug: {
        type: 'fps',
        value: 0,
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },

      target: {
        type: 'target',
        velocity: [0, 0, 0],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 0],
        groups: {
          matchVelocity: {
            title: 'Match Velocity',
            fields: {
              timeToTarget: {
                label: 'Time To Target',
                inputType: 'number',
                step: 0.1,
                defaultValue: DEFAULT_TIME_TO_TARGET,
              },
              targetSpeed: {
                label: 'Target Speed',
                inputType: 'number',
                step: 0.1,
                defaultValue: 0,
              },
            },
          },
        },
      },
    },
  },
}
