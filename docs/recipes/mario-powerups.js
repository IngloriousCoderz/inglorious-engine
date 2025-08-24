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

const BASE_MARIO_BEHAVIORS = [
  { render: renderRectangle },
  modernControls(),
  clamped(),
  jumpable(),
  defaultMario(),
]
const controls = setupControls()

export default {
  devMode: true,
  types: {
    ...controls.types,

    mario: [...BASE_MARIO_BEHAVIORS, baseMario()],

    platform: [{ render: renderRectangle }],

    mushroom: [{ render: renderRectangle }],

    fireFlower: [{ render: renderRectangle }],

    feather: [{ render: renderRectangle }],

    diamond: [{ render: renderRectangle }],

    goomba: [{ render: renderRectangle }],
  },

  entities: {
    ...controls.entities,
    ...controlsEntities("input0", {
      ArrowLeft: "moveLeft",
      ArrowRight: "moveRight",
      Space: "jump",
      KeyF: "float",
      KeyS: "shoot",
      KeyB: "break",
      Btn0: "jump",
      Btn1: "float",
      Btn2: "shoot",
      Btn3: "break",
      Btn14: "moveLeft",
      Btn15: "moveRight",
      Axis0: "moveLeftRight",
    }),

    mario: {
      type: "mario",
      associatedInput: "input0",
      layer: 1,
      position: [100, 32, 0],
      size: [32, 32, 0],
      backgroundColor: "#393664",
      maxSpeed: 250,
      state: "default",
      collisions: {
        platform: {
          shape: "rectangle",
        },
        powerup: {
          shape: "rectangle",
        },
        enemy: {
          shape: "rectangle",
        },
        bounds: {
          shape: "rectangle",
        },
      },
    },

    ground: {
      type: "platform",
      position: [0, 0, 0],
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
      position: [200, 96, 0],
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
      position: [250, 128, 0],
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
      position: [450, 192, 0],
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
      position: [500, 224, 0],
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
      position: [800 - 150, 256, 0],
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
      position: [800 - 150 + 50, 288, 0],
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
      position: [400, 352, 0],
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
      position: [450, 384, 0],
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
      position: [32, 32, 0],
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
      position: [400, 32, 0],
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
      position: [640, 32, 0],
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

function defaultMario() {
  return (type) =>
    extend(type, {
      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        collideWithPowerUps(entity, api)
      },
    })
}

function baseMario() {
  return (type) =>
    extend(type, {
      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        collideWithEnemyAndDie(entity, api)
      },
    })
}

function superMario() {
  return (type) =>
    extend(type, {
      break(entity, { id }) {
        if (id === entity.associatedInput) {
          console.log("Breaking!")
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        collideWithEnemyAndShrink(entity, api)
      },
    })
}

function fireMario() {
  return (type) =>
    extend(type, {
      shoot(entity, { id }) {
        if (id === entity.associatedInput) {
          console.log("Shooting!")
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        collideWithEnemyAndLosePowers(entity, api)
      },
    })
}

function capeMario() {
  return (type) =>
    extend(type, {
      float(entity, { id }) {
        if (id === entity.associatedInput) {
          console.log("Floating!")
        }
      },

      update(entity, dt, api) {
        type.update?.(entity, dt, api)

        collideWithEnemyAndLosePowers(entity, api)
      },
    })
}

function collideWithPowerUps(entity, api) {
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
        type: [...BASE_MARIO_BEHAVIORS, superMario()],
      })
      break

    case "fireFlower":
      entity.size = [64, 64, 0]
      entity.maxSpeed = 350
      entity.backgroundColor = "#f4f3e9"

      api.notify("morph", {
        id: entity.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario()],
      })
      break

    case "feather":
      entity.size = [64, 64, 0]
      entity.maxSpeed = 350
      entity.backgroundColor = "#f4f040"

      api.notify("morph", {
        id: entity.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), capeMario()],
      })
      break

    case "diamond":
      entity.size = [96, 96, 0]
      entity.maxSpeed = 400
      entity.backgroundColor = "#ca00ff"

      api.notify("morph", {
        id: entity.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario(), capeMario()],
      })
      break
  }

  api.notify("remove", powerup.id)
}

function collideWithEnemyAndDie(entity, api) {
  const entities = api.getEntities()
  const enemy = findCollision(entity, entities, "enemy")

  if (!enemy) return

  api.notify("remove", entity.id)
  api.notify("remove", enemy.id)

  console.log("Game over!")
}

function collideWithEnemyAndShrink(entity, api) {
  const entities = api.getEntities()
  const enemy = findCollision(entity, entities, "enemy")

  if (!enemy) return

  entity.size = [32, 32, 0]
  entity.maxSpeed = 250
  entity.backgroundColor = "#393664"

  api.notify("morph", {
    id: entity.type,
    type: [...BASE_MARIO_BEHAVIORS, baseMario()],
  })

  api.notify("remove", enemy.id)
}

function collideWithEnemyAndLosePowers(entity, api) {
  const entities = api.getEntities()
  const enemy = findCollision(entity, entities, "enemy")

  if (!enemy) return

  entity.size = [64, 64, 0]
  entity.maxSpeed = 300
  entity.backgroundColor = "#b9342e"

  api.notify("morph", {
    id: entity.type,
    type: [...BASE_MARIO_BEHAVIORS, superMario()],
  })
  api.notify("remove", enemy.id)
}
