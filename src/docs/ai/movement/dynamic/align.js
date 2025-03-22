import align, {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/dynamic/align.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { clamp } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      enableMouse(),
      {
        "field:change"(instance, event) {
          const { id, value } = event.payload
          if (id === "targetOrientation") {
            instance.orientation = -value * pi()
          }
        },

        "game:update"(instance, event, { instances }) {
          const { input0 } = instances

          if (input0.left || input0.up) {
            instance.orientation += 0.1
          } else if (input0.right || input0.down) {
            instance.orientation -= 0.1
          }
          instance.orientation = clamp(instance.orientation, -pi(), pi())
        },
      },
    ],

    ...enableControls(),

    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, { dt, config, instances }) {
          const target = instances.mouse
          const { fields } = instances.parameters.groups.align

          merge(
            instance,
            align(instance, target, {
              dt,
              targetRadius: fields.targetRadius.value,
              slowRadius: fields.slowRadius.value,
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(instance, config.bounds)
        },
      },
    ],

    form: {
      "field:change"(instance, event) {
        const { id, value } = event.payload
        instance.groups.align.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      mouse: {
        id: "mouse",
        type: "mouse",
        position: [400, 0, 300],
        orientation: 0,
      },

      ...createControls("input0", {
        ArrowLeft: "left",
        ArrowRight: "right",
        ArrowDown: "down",
        ArrowUp: "up",
      }),

      character: {
        id: "character",
        type: "character",
        maxAngularSpeed: pi() / 4,
        maxAngularAcceleration: 10,
        position: [400, 0, 300],
      },

      parameters: {
        type: "form",
        position: [800 - 328, 0, 600],
        groups: {
          align: {
            title: "Dynamic Align",
            fields: {
              targetRadius: {
                label: "Target Radius",
                inputType: "number",
                defaultValue: DEFAULT_TARGET_RADIUS,
              },
              slowRadius: {
                label: "Slow Radius",
                inputType: "number",
                defaultValue: DEFAULT_SLOW_RADIUS,
              },
              timeToTarget: {
                label: "Time To Target",
                inputType: "number",
                step: 0.1,
                defaultValue: DEFAULT_TIME_TO_TARGET,
              },
              targetOrientation: {
                label: "Target Orientation",
                inputType: "number",
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
