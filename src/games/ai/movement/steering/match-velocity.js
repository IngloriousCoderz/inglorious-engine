import engine from '@ezpz/engine'
import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/steering/match-velocity'
import { clampToBounds } from '@ezpz/utils/characters'

export default {
  bounds: [0, 0, 800, 600],

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

    elapsed: {
      'game:update'(instance, _, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const { target } = instances
        const { fields } = instances.parameters.groups.matchVelocity

        instance = {
          ...instance,
          ...matchVelocity(instance, target, {
            ...options,
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
        position: [800 - 177 - 51 - 100, 0, 0 * 21],
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
