import evade, {
  DEFAULT_MAX_PREDICTION,
} from "@inglorious/engine/ai/movement/dynamic/evade.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableMouse } from "@inglorious/game/decorators/input/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [enableMouse()],

    character: [
      enableCharacter(),
      {
        update(instance, dt, { instances }) {
          const { mouse, parameters, game } = instances
          const { fields } = parameters.groups.evade

          merge(
            instance,
            evade(instance, mouse, dt, {
              maxPrediction: fields.maxPrediction.value,
            }),
          )

          clampToBounds(instance, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(instance, { id, value }) {
        instance.groups.evade.fields[id].value = value
      },
    },
  },

  instances: {
    mouse: {
      type: "mouse",
      position: [400, 0, 300],
      velocity: [0, 0, 0],
    },

    character: {
      type: "character",
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
    },

    parameters: {
      type: "form",
      position: [800 - 343, 0, 600],
      groups: {
        evade: {
          title: "Evade",
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
