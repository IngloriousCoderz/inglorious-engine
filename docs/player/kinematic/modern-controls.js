import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { renderCharacter } from "@inglorious/ui/canvas/character.js"

export default {
  types: {
    ...controlsTypes(),

    stats: {},

    character: [{ render: renderCharacter }, modernControls(), clamped()],
  },

  entities: {
    ...controlsEntities("input0", {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyW: "up",
      KeyS: "down",
      KeyA: "left",
      KeyD: "right",
      Btn12: "up",
      Btn13: "down",
      Btn14: "left",
      Btn15: "right",
      Btn0: "jump",
      Axis0: "leftRight",
      Axis1: "upDown",
    }),

    stats: {
      type: "stats",
      position: [600, 0, 600],
      target: "character",
    },

    character: {
      type: "character",
      maxSpeed: 250,
      position: [400, 0, 300],
      maxJump: 100,
      maxLeap: 100,
    },
  },
}
