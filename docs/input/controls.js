import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

export default {
  devMode: true,
  types: {
    ...controlsTypes(),

    character: [{ render: renderCharacter }, modernControls()],
  },

  entities: {
    ...controlsEntities("input0", {
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
      associatedInput: "input0",
      maxSpeed: 250,
      position: [400, 0, 300],
    },
  },
}
