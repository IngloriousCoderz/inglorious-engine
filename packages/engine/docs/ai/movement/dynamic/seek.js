import { seek } from "@inglorious/engine/ai/movement/dynamic/seek.js"
import { mouse } from "@inglorious/engine/behaviors/input/mouse.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderMouse } from "@inglorious/renderers/canvas/mouse.js"
import { merge } from "@inglorious/utils/data-structures/objects.js"

export default {
  types: {
    mouse: [{ render: renderMouse }, mouse()],

    character: [
      {
        render: renderCharacter,
        update(entity, dt, api) {
          const mouse = api.getEntity("mouse")
          merge(entity, seek(entity, mouse, dt))
        },
      },
      clamped(),
    ],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    mouse: {
      type: "mouse",
      position: [400, 0, 300],
    },

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
  },
}
