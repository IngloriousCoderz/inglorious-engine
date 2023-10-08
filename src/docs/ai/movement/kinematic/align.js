import align, {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from '@ezpz/engine/ai/movement/kinematic/align'
import { keyboardInstance, keyboardType } from '@ezpz/engine/input/keyboard'
import { mouseInstance, mouseType } from '@ezpz/engine/input/mouse'
import { clampToBounds } from '@ezpz/utils/characters'
import { merge } from '@ezpz/utils/data-structures/objects'
import { clamp } from '@ezpz/utils/math/numbers'
import { pi } from '@ezpz/utils/math/trigonometry'

export default {
  types: {
    mouse: mouseType({
      'targetOrientation:change'(instance, event) {
        instance.orientation = -event.payload * pi()
      },

      'game:update'(instance, event, { engine }) {
        const { keyboard } = engine.instances

        if (keyboard.ArrowLeft || keyboard.ArrowUp) {
          instance.orientation -= 0.1
        } else if (keyboard.ArrowRight || keyboard.ArrowDown) {
          instance.orientation += 0.1
        }
        instance.orientation = clamp(instance.orientation, -pi(), pi())
      },
    }),

    keyboard: keyboardType(),

    game: {
      'targetRadius:change'(instance, event, { engine }) {
        engine.instances.parameters.groups.align.fields.targetRadius.value =
          event.payload
      },
      'timeToTarget:change'(instance, event, { engine }) {
        engine.instances.parameters.groups.align.fields.timeToTarget.value =
          event.payload
      },
      'targetOrientation:change'(instance, event, { engine }) {
        engine.instances.parameters.groups.align.fields.targetOrientation.value =
          event.payload
      },
    },

    elapsed: {
      'game:update'(instance, event, { elapsed }) {
        instance.value = elapsed
      },
    },

    character: {
      'game:update'(instance, event, { engine, ...options }) {
        const target = engine.instances.mouse
        const { fields } = engine.instances.parameters.groups.align

        merge(
          instance,
          align(instance, target, {
            ...options,
            targetRadius: fields.targetRadius.value,
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
      keyboard: keyboardInstance(),

      debug: {
        type: 'elapsed',
        value: 0,
      },

      character: {
        type: 'character',
        maxRotation: pi() / 4,
        maxAngularSpeed: 10,
        position: [400, 0, 300],
        orientation: 0,
      },

      parameters: {
        type: 'form',
        position: [800 - 328, 0, 0],
        groups: {
          align: {
            title: 'Kinematic Align',
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
              targetOrientation: {
                label: 'Target Orientation',
                inputType: 'number',
                step: 0.25,
                min: -1,
                max: 1,
                defaultValue: 0,
              },
            },
          },
        },
      },
    },
  },
}