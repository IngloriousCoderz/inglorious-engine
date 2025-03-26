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

    character: [
      enableCharacter(),
      enableModernControls(),
      enableClampToBounds(),
      enableJump(),
    ],

    platform: [enablePlatform()],
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

    character: {
      id: "character",
      type: "character",
      position: [200, 62, 0],
      collisions: {
        platform: {
          shape: "circle",
          radius: 12,
        },
      },
    },

    ground: {
      id: "ground",
      type: "platform",
      position: [0, 50, 0],
      size: [800, 50, 0],
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    platform: {
      id: "platform",
      type: "platform",
      position: [600, 100, 0],
      size: [80, 20, 0],
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },
  },
}
