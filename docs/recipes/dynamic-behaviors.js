/* eslint-disable no-console */
import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsEntities,
  setupControls,
} from "@inglorious/engine/behaviors/input/controls.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { findCollision } from "@inglorious/engine/collision/detection.js"
import { renderRectangle } from "@inglorious/renderers/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const BASE_MARIO = [
  { render: renderRectangle },
  modernControls(),
  clamped(),
  jumpable(),
  canCollideWithPowerups,
]

const MARIO = [...BASE_MARIO, canCollideWithEnemyAndDie]

const SUPER_MARIO = [
  ...BASE_MARIO,
  canBreakBricks,
  canCollideWithEnemyAndShrink,
]

const FIRE_MARIO = [
  ...BASE_MARIO,
  canBreakBricks,
  canShoot,
  canCollideWithEnemyAndLosePowers,
]

const CAPE_MARIO = [
  ...BASE_MARIO,
  canBreakBricks,
  canGlide,
  canCollideWithEnemyAndLosePowers,
]

const ULTRA_MARIO = [
  ...BASE_MARIO,
  canBreakBricks,
  canShoot,
  canGlide,
  canCollideWithEnemyAndLosePowers,
]

const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    mario: MARIO,

    platform: [{ render: renderRectangle }],

    mushroom: [{ render: renderRectangle }],

    fireFlower: [{ render: renderRectangle }],

    feather: [{ render: renderRectangle }],

    diamond: [{ render: renderRectangle }],

    goomba: [{ render: renderRectangle }],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", ["mario"], {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      Space: "jump",
      KeyG: "glide",
      KeyS: "shoot",
      KeyB: "break",
      Btn0: "jump",
      Btn1: "glide",
      Btn2: "shoot",
      Btn3: "break",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Axis0: "moveLeftRight",
    }),

    mario: {
      type: "mario",
      layer: 1,
      position: [116, 48, 0],
      size: [32, 32, 0],
      backgroundColor: "#393664",
      maxSpeed: 250,
      state: "default",
      collisions: {
        bounds: {
          shape: "rectangle",
        },
        platform: {
          shape: "rectangle",
        },
        powerup: {
          shape: "rectangle",
        },
        enemy: {
          shape: "rectangle",
        },
      },
    },

    ground: {
      type: "platform",
      position: [400, 16, 0],
      size: [800, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    platform1: {
      type: "platform",
      position: [275, 112, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    powerUp1: {
      type: "mushroom",
      layer: 1,
      position: [266, 144, 0],
      size: [32, 32, 0],
      backgroundColor: "#dc372f",
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    platform2: {
      type: "platform",
      position: [525, 208, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    powerUp2: {
      type: "fireFlower",
      layer: 1,
      position: [516, 240, 0],
      size: [32, 32, 0],
      backgroundColor: "#e86c32",
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    platform3: {
      type: "platform",
      position: [725, 272, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    powerUp3: {
      type: "feather",
      layer: 1,
      position: [716, 304, 0],
      size: [32, 32, 0],
      backgroundColor: "#fdf3f3",
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    platform4: {
      type: "platform",
      position: [475, 368, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "rectangle",
        },
      },
    },

    powerUp4: {
      type: "diamond",
      layer: 1,
      position: [466, 400, 0],
      size: [32, 32, 0],
      backgroundColor: "#ca00ff",
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    enemy1: {
      type: "goomba",
      position: [48, 48, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000",
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },

    enemy2: {
      type: "goomba",
      position: [416, 48, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000",
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },

    enemy3: {
      type: "goomba",
      position: [656, 48, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000",
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },
  },
}

function canBreakBricks(type) {
  return extend(type, {
    break(entity, { entityId }) {
      if (entityId === entity.id) {
        console.log("Breaking!")
      }
    },
  })
}

function canShoot(type) {
  return extend(type, {
    shoot(entity, { entityId }) {
      if (entityId === entity.id) {
        console.log("Shooting!")
      }
    },
  })
}

function canGlide(type) {
  return extend(type, {
    glide(entity, { entityId }) {
      if (entityId === entity.id) {
        console.log("Gliding!")
      }
    },
  })
}

function canCollideWithPowerups(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      const entities = api.getEntities()
      const powerup = findCollision(entity, entities, "powerup")

      if (!powerup) return

      switch (powerup.type) {
        case "mushroom":
          entity.size = [64, 64, 0]
          entity.maxSpeed = 300
          entity.backgroundColor = "#b9342e"

          api.notify("morph", {
            id: entity.type,
            type: SUPER_MARIO,
          })
          break

        case "fireFlower":
          entity.size = [64, 64, 0]
          entity.maxSpeed = 350
          entity.backgroundColor = "#f4f3e9"

          api.notify("morph", {
            id: entity.type,
            type: FIRE_MARIO,
          })
          break

        case "feather":
          entity.size = [64, 64, 0]
          entity.maxSpeed = 350
          entity.backgroundColor = "#f4f040"

          api.notify("morph", {
            id: entity.type,
            type: CAPE_MARIO,
          })
          break

        case "diamond":
          entity.size = [96, 96, 0]
          entity.maxSpeed = 400
          entity.backgroundColor = "#ca00ff"

          api.notify("morph", {
            id: entity.type,
            type: ULTRA_MARIO,
          })
          break
      }

      api.notify("remove", powerup.id)
    },
  })
}

function canCollideWithEnemyAndDie(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      const entities = api.getEntities()
      const enemy = findCollision(entity, entities, "enemy")

      if (!enemy) return

      api.notify("remove", entity.id)
      api.notify("remove", enemy.id)

      console.log("Game over!")
    },
  })
}

function canCollideWithEnemyAndShrink(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      const entities = api.getEntities()
      const enemy = findCollision(entity, entities, "enemy")

      if (!enemy) return

      entity.size = [32, 32, 0]
      entity.maxSpeed = 250
      entity.backgroundColor = "#393664"

      api.notify("morph", {
        id: entity.type,
        type: MARIO,
      })

      api.notify("remove", enemy.id)
    },
  })
}

function canCollideWithEnemyAndLosePowers(type) {
  return extend(type, {
    update(entity, dt, api) {
      type.update?.(entity, dt, api)

      const entities = api.getEntities()
      const enemy = findCollision(entity, entities, "enemy")

      if (!enemy) return

      entity.size = [64, 64, 0]
      entity.maxSpeed = 300
      entity.backgroundColor = "#b9342e"

      api.notify("morph", {
        id: entity.type,
        type: SUPER_MARIO,
      })
      api.notify("remove", enemy.id)
    },
  })
}
