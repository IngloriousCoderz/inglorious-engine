import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"

const controls = setupControls()

export default {
  types: {
    ...controls.types,

    character: [{ render: renderCharacter }, modernControls(), clamped()],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["player1"], {
      KeyW: "moveUp",
      KeyS: "moveDown",
      KeyA: "moveLeft",
      KeyD: "moveRight",
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
