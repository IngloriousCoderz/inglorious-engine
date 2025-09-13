import { modernVelocity } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { clamped } from "@inglorious/engine/behaviors/physics/clamped.js"
import { jumpable } from "@inglorious/engine/behaviors/physics/jumpable.js"
import { renderCharacter } from "@inglorious/renderer-2d/character.js"
import { renderRectangle } from "@inglorious/renderer-2d/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const controls = setupControls()

export default {
  types: {
    ...controls.types,

    platform: [{ render: renderRectangle }],

    character: [
      { render: renderCharacter },
      modernVelocity(),
      clamped({ depthAxis: "z" }),
      (type) =>
        extend(type, {
          jump(entity, event, api) {
            type.jump?.(entity, event, api)

            if (entity.groundObject) {
              api.notify("playSound", "jump")
            }
          },
        }),
      jumpable(),
    ],
  },

  entities: {
    game: {
      type: "game",
      devMode: true,
    },

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

    audio: {
      type: "audio",
      sounds: {
        jump: "/sounds/jump.ogg",
      },
    },

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
