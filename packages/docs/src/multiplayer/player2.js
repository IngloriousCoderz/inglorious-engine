import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"
import { v } from "@inglorious/utils/v.js"

const controls = setupControls()

export default {
  types: {
    ...controls.types,

    character: [{ render: renderCharacter }, modernControls(), clamped()],

    game: (type) =>
      extend(type, {
        start(entity, event, api) {
          api.notify("add", {
            id: "player2",
            type: "character",
            position: v(600, 0, 300),
            orientation: pi(),
            movement: {},
            collisions: {
              bounds: { shape: "circle", radius: 12 },
            },
          })
        },
      }),
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["player2"], {
      KeyI: "moveUp",
      KeyK: "moveDown",
      KeyJ: "moveLeft",
      KeyL: "moveRight",
    }),

    game: {
      type: "game",
      multiplayer: {
        serverUrl: "ws://localhost:3000",
      },
      devMode: true,
    },
  },
}
