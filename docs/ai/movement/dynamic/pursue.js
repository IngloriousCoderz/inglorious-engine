import {
  DEFAULT_MAX_PREDICTION,
  pursue,
} from "@inglorious/engine/ai/movement/dynamic/pursue.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clampToBounds } from "@inglorious/engine/physics/bounds.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, { api }) {
          const mouse = api.getEntity("mouse")
          const parameters = api.getEntity("parameters")
          const game = api.getEntity("game")
          const { fields } = parameters.groups.pursue

          merge(
            entity,
            pursue(entity, mouse, dt, {
              maxPrediction: fields.maxPrediction.value,
            }),
          )

          clampToBounds(entity, game.bounds)
        },
      },
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.pursue.fields[id].value = value
      },
    },
  },

  entities: {
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
