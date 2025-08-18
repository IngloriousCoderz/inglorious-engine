import { enableCharacter } from "@inglorious/game/decorators/character.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableModernControls } from "@inglorious/game/decorators/controls/kinematic/modern.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableJump } from "@inglorious/game/decorators/jump.js"
import { enablePlatform } from "@inglorious/game/decorators/platform.js"

export default {
  types: {
    ...enableControls(),

    platform: [enablePlatform()],

    character: [
      enableCharacter(),
      enableModernControls(),
      enableClampToBounds(),
      enableJump(),
    ],
  },

  instances: {
    ...createControls("input0", {
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
      size: [800, 50, 0],
      backgroundColor: "green",
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    platform: {
      type: "platform",
      position: [600, 100, 0],
      size: [80, 20, 0],
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
      position: [200, 74, 0],
      collisions: {
        platform: {
          shape: "rectangle",
          size: [24, 24, 24],
          // shape: "circle",
          // radius: 12,
        },
      },
    },
  },
}
