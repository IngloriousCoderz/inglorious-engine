import align, {
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/kinematic/align.js"
import { character } from "@inglorious/game/behaviors/character.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { clamp } from "@inglorious/utils/math/numbers.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [
      mouse(),
      {
        fieldChange(instance, { id, value }) {
          if (id === "targetOrientation") {
            instance.orientation = -value * pi()
          }
        },

        update(instance, dt, { instances }) {
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

    ...controlsTypes(),

    character: [
      character(),
      {
        update(instance, dt, { instances }) {
          const { mouse, parameters, game } = instances
          const { fields } = parameters.groups.align

          merge(
            instance,
            align(instance, mouse, dt, {
              targetRadius: fields.targetRadius.value,
              timeToTarget: fields.timeToTarget.value,
            }),
          )

          clampToBounds(instance, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(instance, { id, value }) {
        instance.groups.align.fields[id].value = value
      },
    },
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
      orientation: 0,
    },
    ...controlsInstances("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
    }),

    character: {
      type: "character",
      maxAngularSpeed: pi() / 4,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 328, 0, 600],
      groups: {
        align: {
          title: "Kinematic Align",
          fields: {
            targetRadius: {
              label: "Target Radius",
              inputType: "number",
              defaultValue: DEFAULT_TARGET_RADIUS,
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
}
