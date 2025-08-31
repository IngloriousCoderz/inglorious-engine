import { modernControls } from "@inglorious/engine/behaviors/controls/dynamic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"

const controls = setupControls()

export default {
  types: {
    ...controls.types,

    stats: {},

    character: [{ render: renderCharacter }, modernControls(), clamped()],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

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

    stats: {
      type: "stats",
      position: [600, 0, 600],
      target: "character",
    },

    character: {
      type: "character",
      maxAcceleration: 500,
      friction: 250,
      position: [400, 0, 300],
      maxJump: 100,
      maxLeap: 100,
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
        },
      },
    },
  },
}
