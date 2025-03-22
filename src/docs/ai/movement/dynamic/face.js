import {
  DEFAULT_SLOW_RADIUS,
  DEFAULT_TARGET_RADIUS,
  DEFAULT_TIME_TO_TARGET,
} from "@inglorious/engine/ai/movement/dynamic/align.js"
import face from "@inglorious/engine/ai/movement/dynamic/face.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      {
        "game:update"(instance, event, { dt, config, instances }) {
          const target = instances.mouse
          const { fields } = instances.parameters.groups.face

          merge(
            instance,
            face(instance, target, {
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
        instance.groups.face.fields[id].value = value
      },
    },
  },

  state: {
    instances: {
      mouse: { id: "mouse", type: "mouse", position: [400, 0, 300] },

      character: {
        id: "character",
        type: "character",
        maxAngularSpeed: pi() / 4,
        maxAngularAcceleration: 1000,
        position: [400, 0, 300],
      },

      parameters: {
        type: "form",
        position: [800 - 328, 0, 600],
        groups: {
          face: {
            title: "Face",
            fields: {
              targetRadius: {
                label: "Target Radius",
                inputType: "number",
                step: 0.1,
                defaultValue: DEFAULT_TARGET_RADIUS,
              },
              slowRadius: {
                label: "Slow Radius",
                inputType: "number",
                step: 0.1,
                defaultValue: DEFAULT_SLOW_RADIUS,
              },
              timeToTarget: {
                label: "Time To Target",
                inputType: "number",
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
