import { findCollisions } from "@inglorious/engine/collision/detection.js"
import { collisionGizmos } from "@inglorious/game/behaviors/debug/collision.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/game/behaviors/input/controls.js"
import { Sprite } from "@inglorious/game/sprite.js"
import { renderSprite } from "@inglorious/ui/canvas/image/sprite.js"
import { renderTilemap } from "@inglorious/ui/canvas/image/tilemap.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { zero } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

export default {
  types: {
    ...controlsTypes(),

    tilemap: [{ render: renderTilemap }, collisionGizmos()],

    player: [
      { render: renderSprite },
      collisionGizmos(),
      // modernControls(),
      (type) =>
        extend(type, {
          update(instance, dt, options) {
            type.update?.(instance, dt, options)

            const { maxSpeed } = instance
            const { instances, notify } = options
            const { dungeon, input0 } = instances

            const spriteState = Sprite.move2(instance)
            Sprite.play({ state: spriteState, instance, dt, notify })

            instance.velocity = zero()

            if (input0.left) {
              instance.velocity[X] = -maxSpeed
            }
            if (input0.right) {
              instance.velocity[X] = maxSpeed
            }
            if (input0.leftRight != null) {
              instance.velocity[X] += input0.leftRight * maxSpeed
            }

            const oldX = instance.position[X]
            instance.position[X] += instance.velocity[X] * dt
            if (findCollisions(dungeon, instance)) {
              instance.position[X] = oldX
            }

            if (input0.down) {
              instance.velocity[Z] = -maxSpeed
            }
            if (input0.up) {
              instance.velocity[Z] = maxSpeed
            }
            if (input0.upDown != null) {
              instance.velocity[Z] += -input0.upDown * maxSpeed
            }

            const oldZ = instance.position[Z]
            instance.position[Z] += instance.velocity[Z] * dt
            if (findCollisions(dungeon, instance)) {
              instance.position[Z] = oldZ
            }
          },
        }),
    ],
  },

  instances: {
    game: {
      pixelated: true,
    },

    ...controlsInstances("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      ArrowDown: "down",
      ArrowUp: "up",
    }),

    dungeon: {
      type: "tilemap",
      position: [400 - (48 * 6) / 2, 0, 300 - (48 * 5) / 2],
      tilemap: {
        image: {
          id: "dungeon",
          src: "/tilemaps/dungeon.png",
          imageSize: [160, 160],
          tileSize: [16, 16],
          columns: 6,
          scale: 3,
        },
        layers: [
          {
            tiles: [
              // first row
              0, 1, 2, 3, 4, 5,
              // second row
              10, 11, 12, 13, 14, 15,
              // third row
              20, 21, 22, 23, 24, 25,
              // fourth row
              30, 31, 32, 33, 34, 35,
              // fifth row
              40, 41, 42, 43, 44, 45,
            ],
          },
          {
            tiles: [
              // first row
              -1, -1, -1, -1, -1, -1,
              // second row
              -1, -1, 83, -1, -1, -1,
              // third row
              -1, -1, -1, 97, -1, -1,
              // fourth row
              -1, -1, -1, -1, -1, -1,
              // fifth row
              -1, -1, 66, 67, -1, -1,
            ],
          },
        ],
      },
      collisions: {
        hitbox: {
          shape: "hitmask",
          tileSize: [48, 48],
          columns: 6,
          heights: [
            // first row
            2, 2, 2, 2, 2, 2,
            // second row
            2, 0, 1, 0, 0, 2,
            // third row
            2, 0, 0, 1, 0, 2,
            // fourth row
            2, 0, 0, 0, 0, 2,
            // fifth row
            2, 2, 2, 2, 2, 2,
          ],
        },
      },
    },

    player: {
      type: "player",
      position: [400 - 16 * 3, 1, 300 - 16],
      maxSpeed: 250,
      sprite: {
        image: {
          id: "dungeon_character",
          src: "/sprites/dungeon_character.png",
          imageSize: [112, 64],
          tileSize: [16, 16],
          scale: 3,
        },
        speed: 0.2,
        frames: {
          right: [17],
          left: [0x80000000 + 17],
        },
      },
      collisions: {
        hitbox: {
          shape: "rectangle",
          size: [48, 0, 48],
          offset: [-48 / 2, 0, -48 / 2],
          // size: [24, 0, 24],
          // offset: [-8, 0, -8],
        },
      },
    },
  },
}
