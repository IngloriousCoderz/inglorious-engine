import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { pi } from "@inglorious/utils/math/trigonometry.js"

const controls = setupControls()

const playerId = String(Math.round(Math.random() * 1_000_000)).padStart(6, "0")

export default {
  types: {
    ...controls.types,

    character: [{ render: renderCharacter }, modernControls(), clamped()],

    game: (type) =>
      extend(type, {
        start(entity, event, api) {
          api.notify("add", {
            id: playerId,
            type: "character",
            position: [600, 0, 300],
            orientation: pi(),
            movement: {},
            collisions: {
              bounds: {
                shape: "circle",
                radius: 12,
              },
            },
          })
        },
      }),
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", [playerId], {
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
