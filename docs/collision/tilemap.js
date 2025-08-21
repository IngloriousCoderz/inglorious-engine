import { Sprite } from "@inglorious/engine/animation/sprite.js"
import { collisionGizmos } from "@inglorious/engine/behaviors/debug/collision.js"
import {
  controlsEntities,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { findCollisions } from "@inglorious/engine/collision/detection.js"
import { renderSprite } from "@inglorious/renderers/canvas/image/sprite.js"
import { renderTilemap } from "@inglorious/renderers/canvas/image/tilemap.js"
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
          update(entity, dt, api) {
            type.update?.(entity, dt, api)

            const dungeon = api.getEntity("dungeon")
            const input0 = api.getEntity("input0")

            const { maxSpeed } = entity

            const animation = Sprite.move2(entity)
            Sprite.play(animation, { entity, dt, notify: api.notify })

            entity.velocity = zero()

            if (input0.left) {
              entity.velocity[X] = -maxSpeed
            }
            if (input0.right) {
              entity.velocity[X] = maxSpeed
            }
            if (input0.leftRight != null) {
              entity.velocity[X] += input0.leftRight * maxSpeed
            }

            const oldX = entity.position[X]
            entity.position[X] += entity.velocity[X] * dt
            if (findCollisions(dungeon, entity)) {
              entity.position[X] = oldX
            }

            if (input0.down) {
              entity.velocity[Z] = -maxSpeed
            }
            if (input0.up) {
              entity.velocity[Z] = maxSpeed
            }
            if (input0.upDown != null) {
              entity.velocity[Z] += -input0.upDown * maxSpeed
            }

            const oldZ = entity.position[Z]
            entity.position[Z] += entity.velocity[Z] * dt
            if (findCollisions(dungeon, entity)) {
              entity.position[Z] = oldZ
            }
          },
        }),
    ],
  },

  entities: {
    game: {
      pixelated: true,
    },

    ...controlsEntities("input0", {
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
      position: [400 - 48 / 2, 1, 300 - 48],
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
          offset: [48 / 2, 0, -48 / 2],
        },
      },
    },
  },
}
