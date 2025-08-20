import { clamped } from "@inglorious/game/behaviors/clamped.js"
import { modernControls } from "@inglorious/game/behaviors/controls/kinematic/modern.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"
import { jumpable } from "@inglorious/game/behaviors/jumpable.js"
import renderCharacter from "@inglorious/ui/canvas/character.js"
import renderRectangle from "@inglorious/ui/canvas/shapes/rectangle.js"

export default {
  types: {
    ...controlsTypes(),

    platform: [{ render: renderRectangle }],

    character: [
      { render: renderCharacter },
      modernControls(),
      clamped(),
      jumpable(),
    ],
  },

  instances: {
    ...controlsInstances("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyA: "left",
      KeyD: "right",
      Btn0: "jump",
      Btn14: "left",
      Btn15: "right",
      Axis0: "leftRight",
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
