import pursue, {
  DEFAULT_MAX_PREDICTION,
} from "@inglorious/engine/ai/movement/dynamic/pursue.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { extend, merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      (type) =>
        extend(type, {
          "game:update"(instance, event, { dt, instances }) {
            const target = instances.mouse
            const { fields } = instances.parameters.groups.pursue

            merge(
              instance,
              pursue(instance, target, {
                dt,
                maxPrediction: fields.maxPrediction.value,
              }),
            )

            clampToBounds(instance, instances.game.bounds)
          },
        }),
    ],

    form: {
      "field:change"(instance, event) {
        const { id, value } = event.payload
        instance.groups.pursue.fields[id].value = value
      },
    },
  },

  instances: {
    mouse: {
      id: "mouse",
      type: "mouse",
      position: [400, 0, 300],
      velocity: [0, 0, 0],
    },

    character: {
      id: "character",
      type: "character",
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 343, 0, 600],
      groups: {
        pursue: {
          title: "Pursue",
          fields: {
            maxPrediction: {
              label: "Max Prediction",
              inputType: "number",
              defaultValue: DEFAULT_MAX_PREDICTION,
            },
          },
        },
      },
    },
  },
}
