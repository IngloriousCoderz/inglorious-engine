import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { renderCharacter } from "@inglorious/renderers/canvas/character.js"
import { renderRectangle } from "@inglorious/renderers/canvas/shapes/rectangle.js"

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    platform: [{ render: renderRectangle }],

    character: [
      { render: renderCharacter },
      modernControls(),
      clamped(),
      jumpable(),
    ],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      Space: "jump",
      KeyA: "moveLeft",
      KeyD: "moveRight",
      Btn0: "jump",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Axis0: "moveLeftRight",
    }),

    ground: {
      type: "platform",
      position: [0, 0, 0],
      size: [800, 64, 0],
      backgroundColor: "green",
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    platform: {
      type: "platform",
      position: [600, 128, 0],
      size: [80, 24, 0],
      backgroundColor: "grey",
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    character: {
      type: "character",
      associatedInput: "input0",
      layer: 1,
      position: [200, 76, 0],
      collisions: {
        platform: {
          shape: "circle",
          radius: 12,
        },
      },
    },
  },
}
