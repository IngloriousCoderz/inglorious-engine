import matchVelocity, {
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/steering/match-velocity'
import {
  keyboardInstance,
  keyboardType,
} from '@inglorious/engine/input/keyboard'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    keyboard: keyboardType(),

    game: {
      'timeToTarget:change'(instance, event, { instances }) {
        instances.parameters.groups.matchVelocity.fields.timeToTarget.value =
          event.payload
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const { fields } = instances.parameters.groups.matchVelocity

        const { keyboard } = instances

        const SPEED = 5

        const target = { velocity: [0, 0, 0] }
        if (keyboard.ArrowLeft) {
          target.velocity[0] = -SPEED
        }
        if (keyboard.ArrowDown) {
          target.velocity[2] = -SPEED
        }
        if (keyboard.ArrowRight) {
          target.velocity[0] = SPEED
        }
        if (keyboard.ArrowUp) {
          target.velocity[2] = SPEED
        }

        merge(
          instance,
          matchVelocity(instance, target, {
            dt,
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
      keyboard: keyboardInstance(),

      character: {
        type: 'character',
        maxAcceleration: 10,
        velocity: [0, 0, 0],
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
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
            },
          },
        },
      },
    },
  },
}
