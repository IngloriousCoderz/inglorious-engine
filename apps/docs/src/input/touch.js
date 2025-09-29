import { createTouch, touch } from "@inglorious/engine/behaviors/input/touch.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"
import { v } from "@inglorious/utils/v.js"

export default {
  types: {
    touch: [touch()],

    character: [
      { render: renderCharacter },
      {
        update(entity, dt, api) {
          const touch = api.getEntity("touch")
          entity.position = touch.position
        },
      },
    ],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

    touch: createTouch({ position: v(400, 0, 300) }),

    character: {
      type: "character",
      velocity: v(0, 0, 0),
      position: v(400, 0, 300),
    },
  },
}
