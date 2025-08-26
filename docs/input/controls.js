import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    character: [{ render: renderCharacter }, modernControls()],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["character"], {
      ArrowUp: "moveUp",
      ArrowDown: "moveDown",
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      KeyW: "moveUp",
      KeyS: "moveDown",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Btn12: "moveUp",
      Btn13: "moveDown",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Axis0: "moveLeftRight",
      Axis1: "moveUpDown",
    }),

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
