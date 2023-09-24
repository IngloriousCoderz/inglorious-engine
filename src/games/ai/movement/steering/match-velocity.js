import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '../../../../ai/movement/steering/match-velocity'
import engine from '../../../../engine'
import { clampToBounds } from '../../../../utils/characters'

export default {
  bounds: [0, 0, 800, 600],
  types: {
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

    cursor: {
      'targetSpeed:change'(instance, event) {
        instance.velocity = [event.payload, 0, 0]
      },
    },

    character: {
      'game:update'(instance, _, { instances, ...options }) {
        const target = instances.cursor
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

      cursor: {
        type: 'cursor',
        velocity: [0, 0, 0],
        position: [0, 0, 0],
      },

      character: {
        type: 'character',
        maxSpeed: 250,
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
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
