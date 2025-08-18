/* eslint-disable no-console */
import { findCollision } from "@inglorious/engine/collision/detection.js"
import { enableClampToBounds as clampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableModernControls as modernControls } from "@inglorious/game/decorators/controls/kinematic/modern.js"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableJump as jump } from "@inglorious/game/decorators/jump.js"
import draw from "@inglorious/ui/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const BASE_MARIO_BEHAVIORS = [
  modernControls(),
  clampToBounds(),
  jump(),
  baseMario(),
]

export default {
  types: {
    ...enableControls(),

    mario: [...BASE_MARIO_BEHAVIORS, regularMario()],

    platform: { draw },

    mushroom: { draw },

    fireFlower: { draw },

    feather: { draw },

    diamond: { draw },

    goomba: { draw },
  },

  instances: {
    ...createControls("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyS: "shoot",
      KeyF: "float",
    }),

    mario: {
      type: "mario",
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
      },
    },

    ground: {
      type: "platform",
      position: [0, 0, 0],
      size: [800, 32, 0],
      backgroundColor: "#654321",
      collisions: {
        platform: {
          shape: "platform",
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
          shape: "platform",
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
          shape: "platform",
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
          shape: "platform",
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
          shape: "platform",
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

function baseMario() {
  return (type) =>
    extend(type, {
      draw,

      "game:update": (instance, dt, options) => {
        type["game:update"]?.(instance, dt, options)

        collideWithPowerUps(instance, options)
      },
    })
}

function regularMario() {
  return (type) =>
    extend(type, {
      draw,

      "game:update": (instance, dt, options) => {
        type["game:update"]?.(instance, dt, options)

        collideWithEnemyAndDie(instance, options)
      },
    })
}

function superMario() {
  return (type) =>
    extend(type, {
      "game:update": (instance, dt, options) => {
        type["game:update"]?.(instance, dt, options)

        collideWithEnemyAndShrink(instance, options)
      },
    })
}

function fireMario() {
  return (type) =>
    extend(type, {
      "input:press": (instance, { id, action }) => {
        type["input:press"]?.(instance, { id, action })
        if (id.endsWith("input0") && action === "shoot") {
          console.log("Shoot!")
        }
      },

      "game:update": (instance, dt, options) => {
        type["game:update"]?.(instance, dt, options)

        collideWithEnemyAndLosePowers(instance, options)
      },
    })
}

function capeMario() {
  return (type) =>
    extend(type, {
      "input:press": (instance, { id, action }) => {
        type["input:press"]?.(instance, { id, action })

        if (id.endsWith("input0") && action === "float") {
          console.log("Float!")
        }
      },

      "game:update": (instance, dt, options) => {
        type["game:update"]?.(instance, dt, options)

        collideWithEnemyAndLosePowers(instance, options)
      },
    })
}

function collideWithPowerUps(instance, { instances, notify }) {
  const powerup = findCollision(instance, {
    instances,
    collisionGroup: "powerup",
  })

  if (!powerup) return

  switch (powerup.type) {
    case "mushroom":
      instance.size = [64, 64, 0]
      instance.maxSpeed = 300
      instance.backgroundColor = "#b9342e"

      notify("type:change", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario()],
      })
      break

    case "fireFlower":
      instance.size = [64, 64, 0]
      instance.maxSpeed = 350
      instance.backgroundColor = "#f4f3e9"

      notify("type:change", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario()],
      })
      break

    case "feather":
      instance.size = [64, 64, 0]
      instance.maxSpeed = 350
      instance.backgroundColor = "#f4f040"

      notify("type:change", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), capeMario()],
      })
      break

    case "diamond":
      instance.size = [96, 96, 0]
      instance.maxSpeed = 400
      instance.backgroundColor = "#ca00ff"

      notify("type:change", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario(), capeMario()],
      })
      break
  }
  notify("instance:remove", powerup.id)
}

function collideWithEnemyAndDie(instance, { instances, notify }) {
  const enemy = findCollision(instance, {
    instances,
    collisionGroup: "enemy",
  })

  if (!enemy) return

  notify("instance:remove", instance.id)
  notify("instance:remove", enemy.id)

  console.log("Game over!")
}

function collideWithEnemyAndShrink(instance, { instances, notify }) {
  const enemy = findCollision(instance, {
    instances,
    collisionGroup: "enemy",
  })

  if (!enemy) return

  instance.size = [32, 32, 0]
  instance.maxSpeed = 250
  instance.backgroundColor = "#393664"

  notify("type:change", {
    id: instance.type,
    type: [...BASE_MARIO_BEHAVIORS, regularMario()],
  })
  notify("instance:remove", enemy.id)
}

function collideWithEnemyAndLosePowers(instance, { instances, notify }) {
  const enemy = findCollision(instance, {
    instances,
    collisionGroup: "enemy",
  })

  if (!enemy) return

  instance.size = [64, 64, 0]
  instance.maxSpeed = 300
  instance.backgroundColor = "#b9342e"

  notify("type:change", {
    id: instance.type,
    type: [...BASE_MARIO_BEHAVIORS, superMario()],
  })
  notify("instance:remove", enemy.id)
}
