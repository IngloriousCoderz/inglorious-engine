import evade, {
  DEFAULT_MAX_PREDICTION,
} from "@inglorious/engine/ai/movement/dynamic/evade.js"
import { mouse } from "@inglorious/game/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/game/bounds.js"
import renderCharacter from "@inglorious/ui/canvas/character.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [mouse()],

    character: [
      { render: renderCharacter },
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
