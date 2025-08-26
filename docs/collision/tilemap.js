import { Sprite } from "@inglorious/engine/animation/sprite.js"
import { modernVelocity } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import { collisionGizmos } from "@inglorious/engine/behaviors/debug/collision.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { findCollisions } from "@inglorious/engine/collision/detection.js"
import { spriteAnimationSystem } from "@inglorious/engine/systems/sprite-animation.js"
import { renderSprite } from "@inglorious/renderers/canvas/image/sprite.js"
import { renderTilemap } from "@inglorious/renderers/canvas/image/tilemap.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"
import { angle } from "@inglorious/utils/math/linear-algebra/vector.js"

const X = 0
const Z = 2

const controls = setupControls()

export default {
  devMode: true,

  systems: [spriteAnimationSystem],

  types: {
    ...controls.types,

    tilemap: [{ render: renderTilemap }, collisionGizmos()],

    player: [
      { render: renderSprite },
      collisionGizmos(),
      modernVelocity(),
      tilemapCollider,
      animated,
    ],
  },

  entities: {
    game: {
      pixelated: true,
    },

    ...controls.entities,
    ...controlsEntities("input0", ["player"], {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      ArrowDown: "moveDown",
      ArrowUp: "moveUp",
      Axis0: "moveLeftRight",
      Axis1: "moveUpDown",
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
      position: [400 - 48, 1, 300 - 48 / 2],
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
          size: [44, 0, 44],
          offset: [-44 / 2, 0, -44 / 2],
        },
      },
    },
  },
}

function tilemapCollider(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      const dungeon = api.getEntity("dungeon")

      // Check for collision on the X-axis
      const newPositionX = [...entity.position]
      newPositionX[X] += entity.velocity[X] * dt
      const tempEntityX = { ...entity, position: newPositionX }
      if (!findCollisions(dungeon, tempEntityX)) {
        entity.position[X] = newPositionX[X]
      }

      // Check for collision on the Z-axis
      const newPositionZ = [...entity.position]
      newPositionZ[Z] += entity.velocity[Z] * dt
      const tempEntityZ = { ...entity, position: newPositionZ }
      if (!findCollisions(dungeon, tempEntityZ)) {
        entity.position[Z] = newPositionZ[Z]
      }
    },
  })
}

function animated(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      entity.orientation = angle(entity.velocity)

      const animation = Sprite.move2(entity)
      entity.sprite.state = animation
    },
  })
}
