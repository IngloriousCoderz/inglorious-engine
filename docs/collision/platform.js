import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernVelocity } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
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
      modernVelocity(),
      clamped({ depthAxis: "z" }),
      jumpable(),
    ],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["character"], {
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
      position: [400, 24, 0],
      size: [800, 48],
      backgroundColor: "green",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    platform: {
      type: "platform",
      position: [600, 120, 0],
      size: [80, 24, 0],
      backgroundColor: "grey",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    character: {
      type: "character",
      layer: 1,
      position: [200, 60, 0],
      collisions: {
        bounds: {
          shape: "circle",
          radius: 12,
          // shape: "rectangle",
          // size: [24, 24, 0],
        },
        platform: {
          shape: "circle",
          radius: 12,
        },
      },
    },
  },
}
