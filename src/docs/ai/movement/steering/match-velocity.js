import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/steering/match-velocity'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'

export default {
  bounds: [0, 0, 800, 600],

  types: {
    target: {
      'targetSpeed:change'(instance, event) {
        instance.velocity = [event.payload, 0, 0]
      },
    },

    game: {
      'timeToTarget:change'(_, event, { engine }) {
        engine.instances.parameters.groups.matchVelocity.fields.timeToTarget.value =
          event.payload
      },

      'targetSpeed:change'(_, event, { engine }) {
        engine.instances.parameters.groups.matchVelocity.fields.targetSpeed.value =
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
        const { target } = engine.instances
        const { fields } = engine.instances.parameters.groups.matchVelocity

        merge(
          instance,
          matchVelocity(instance, target, {
            ...options,
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
