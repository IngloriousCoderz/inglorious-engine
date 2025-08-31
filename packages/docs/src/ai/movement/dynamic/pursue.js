import {
  DEFAULT_MAX_PREDICTION,
  pursue,
} from "@inglorious/engine/ai/movement/dynamic/pursue.js"
import { createMouse, mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"
import { renderMouse } from "@inglorious/renderer-2d/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      {
        render: renderCharacter,
        update(entity, dt, api) {
          const mouse = api.getEntity("mouse")
          const parameters = api.getEntity("parameters")
          const { fields } = parameters.groups.pursue

          merge(
            entity,
            pursue(entity, mouse, dt, {
              maxPrediction: fields.maxPrediction.value,
            }),
          )
        },
      },
      clamped(),
    ],

    form: {
      fieldChange(entity, { id, value }) {
        entity.groups.pursue.fields[id].value = value
      },
    },
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: createMouse("mouse", {
      position: [400, 0, 300],
      velocity: [0, 0, 0],
    }),

    character: {
      type: "character",
      maxAcceleration: 1000,
      maxSpeed: 250,
      position: [400, 0, 300],
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
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
