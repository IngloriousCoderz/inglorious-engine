import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/dynamic/modern.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

export default {
  devMode: true,
  types: {
    ...controlsTypes(),

    stats: {},

    character: [{ render: renderCharacter }, modernControls(), clamped()],
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

    stats: {
      type: "stats",
      position: [600, 0, 600],
      target: "character",
    },

    character: {
      type: "character",
      associatedInput: "input0",
      maxAcceleration: 500,
      friction: 250,
      position: [400, 0, 300],
      maxJump: 100,
      maxLeap: 100,
    },
  },
}
