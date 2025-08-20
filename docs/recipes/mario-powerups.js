/* eslint-disable no-console */
import { clamped } from "@inglorious/engine/behaviors/clamped.js"
import { modernControls } from "@inglorious/engine/behaviors/controls/kinematic/modern.js"
import {
  controlsInstances,
  controlsTypes,
} from "@inglorious/engine/behaviors/input/controls.js"
import { jumpable } from "@inglorious/engine/behaviors/jumpable.js"
import { findCollision } from "@inglorious/engine/collision/detection.js"
import { renderRectangle } from "@inglorious/ui/canvas/shapes/rectangle.js"
import { extend } from "@inglorious/utils/data-structures/objects.js"

const BASE_MARIO_BEHAVIORS = [
  { render: renderRectangle },
  modernControls(),
  clamped(),
  jumpable(),
  defaultMario(),
]

export default {
  types: {
    ...controlsTypes(),

    mario: [...BASE_MARIO_BEHAVIORS, baseMario()],

    platform: [{ render: renderRectangle }],

    mushroom: [{ render: renderRectangle }],

    fireFlower: [{ render: renderRectangle }],

    feather: [{ render: renderRectangle }],

    diamond: [{ render: renderRectangle }],

    goomba: [{ render: renderRectangle }],
  },

  instances: {
    ...controlsInstances("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyB: "break",
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

function defaultMario() {
  return (type) =>
    extend(type, {
      update(instance, dt, options) {
        type.update?.(instance, dt, options)

        collideWithPowerUps(instance, options)
      },
    })
}

function baseMario() {
  return (type) =>
    extend(type, {
      update(instance, dt, options) {
        type.update?.(instance, dt, options)

        collideWithEnemyAndDie(instance, options)
      },
    })
}

function superMario() {
  return (type) =>
    extend(type, {
      inputPress(instance, { id, action }) {
        type.inputPress?.(instance, { id, action })
        if (id.endsWith("input0") && action === "break") {
          console.log("Break!")
        }
      },

      update(instance, dt, options) {
        type.update?.(instance, dt, options)

        collideWithEnemyAndShrink(instance, options)
      },
    })
}

function fireMario() {
  return (type) =>
    extend(type, {
      inputPress(instance, { id, action }) {
        type.inputPress?.(instance, { id, action })
        if (id.endsWith("input0") && action === "shoot") {
          console.log("Shoot!")
        }
      },

      update(instance, dt, options) {
        type.update?.(instance, dt, options)

        collideWithEnemyAndLosePowers(instance, options)
      },
    })
}

function capeMario() {
  return (type) =>
    extend(type, {
      inputPress(instance, { id, action }) {
        type.inputPress?.(instance, { id, action })

        if (id.endsWith("input0") && action === "float") {
          console.log("Float!")
        }
      },

      update(instance, dt, options) {
        type.update?.(instance, dt, options)

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

      notify("morph", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario()],
      })
      break

    case "fireFlower":
      instance.size = [64, 64, 0]
      instance.maxSpeed = 350
      instance.backgroundColor = "#f4f3e9"

      notify("morph", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario()],
      })
      break

    case "feather":
      instance.size = [64, 64, 0]
      instance.maxSpeed = 350
      instance.backgroundColor = "#f4f040"

      notify("morph", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), capeMario()],
      })
      break

    case "diamond":
      instance.size = [96, 96, 0]
      instance.maxSpeed = 400
      instance.backgroundColor = "#ca00ff"

      notify("morph", {
        id: instance.type,
        type: [...BASE_MARIO_BEHAVIORS, superMario(), fireMario(), capeMario()],
      })
      break
  }
  notify("remove", powerup.id)
}

function collideWithEnemyAndDie(instance, { instances, notify }) {
  const enemy = findCollision(instance, {
    instances,
    collisionGroup: "enemy",
  })

  if (!enemy) return

  notify("remove", instance.id)
  notify("remove", enemy.id)

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

  notify("morph", {
    id: instance.type,
    type: [...BASE_MARIO_BEHAVIORS, baseMario()],
  })
  notify("remove", enemy.id)
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

  notify("morph", {
    id: instance.type,
    type: [...BASE_MARIO_BEHAVIORS, superMario()],
  })
  notify("remove", enemy.id)
}
