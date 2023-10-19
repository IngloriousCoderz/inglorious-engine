import arrive, {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@inglorious/engine/ai/movement/kinematic/arrive'
import { mouseInstance, mouseType } from '@inglorious/engine/input/mouse'
import { clampToBounds } from '@inglorious/utils/character'
import { merge } from '@inglorious/utils/data-structures/objects'

export default {
  types: {
    ...mouseType(),

    game: {
      'targetRadius:change'(instance, event, { instances }) {
        instances.parameters.groups.arrive.fields.targetRadius.value =
          event.payload
      },
      'timeToTarget:change'(instance, event, { instances }) {
        instances.parameters.groups.arrive.fields.timeToTarget.value =
          event.payload
      },
    },

    character: {
      'game:update'(instance, event, { dt, config, instances }) {
        const target = instances.mouse
        const { fields } = instances.parameters.groups.arrive

        merge(
          instance,
          arrive(instance, target, {
            dt,
            targetRadius: fields.targetRadius.value,
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
      ...mouseInstance(),

      character: {
        type: 'character',
        maxSpeed: 250,
        position: [400, 0, 300],
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 600],
        groups: {
          arrive: {
            title: 'Kinematic Arrive',
            fields: {
              targetRadius: {
                label: 'Target Radius',
                inputType: 'number',
                defaultValue: DEFAULT_TARGET_RADIUS,
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
