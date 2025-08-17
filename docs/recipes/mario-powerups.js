/* eslint-disable no-console */
import { collidesWith } from "@inglorious/engine/collision/detection.js"
import { enableClampToBounds } from "@inglorious/game/decorators/clamp-to-bounds.js"
import { enableModernControls } from "@inglorious/game/decorators/controls/kinematic/modern.js"
import { enableCollisionsDebug } from "@inglorious/game/decorators/debug/collisions"
import {
  createControls,
  enableControls,
} from "@inglorious/game/decorators/input/controls.js"
import { enableJump } from "@inglorious/game/decorators/jump.js"
import draw from "@inglorious/ui/canvas/shapes/rectangle.js"

const collideWithPowerUps = (instance, { instances, notify }) => {
  const powerups = Object.values(instances).filter(({ type }) =>
    ["mushroom", "fireFlower"].includes(type),
  )
  powerups.forEach((powerup) => {
    if (collidesWith(instance, powerup, "powerup")) {
      switch (powerup.type) {
        case "mushroom":
          notify({
            id: "type:change",
            payload: {
              id: instance.type,
              type: [
                enableBaseMario(),
                enableSuperMario(),
                enableModernControls(),
                enableClampToBounds(),
                enableJump(),
                enableCollisionsDebug(),
              ],
            },
          })
          break

        case "fireFlower":
          notify({
            id: "type:change",
            payload: {
              id: instance.type,
              type: [
                enableBaseMario(),
                enableSuperMario(),
                enableFireMario(),
                enableModernControls(),
                enableClampToBounds(),
                enableJump(),
                enableCollisionsDebug(),
              ],
            },
          })
          break
      }
      notify({ id: "instance:remove", payload: powerup.id })
    }
  })
}

const enableBaseMario = () => ({
  draw,

  "game:update": (instance, dt, options) => {
    instance.size = [32, 32, 0]
    instance.backgroundColor = "#d02011" // Red

    collideWithPowerUps(instance, options)

    const { instances, notify } = options
    const enemies = Object.values(instances).filter(
      ({ type }) => type === "goomba",
    )
    enemies.forEach((enemy) => {
      if (collidesWith(instance, enemy, "enemy")) {
        notify({ id: "instance:remove", payload: instance.id })
        notify({ id: "instance:remove", payload: enemy.id })
      }
    })
  },
})

const enableSuperMario = () => ({
  draw,

  "game:update": (instance, dt, options) => {
    instance.size = [64, 64, 0]
    instance.speed = 300
    instance.backgroundColor = "#8d150b" // Dark Red

    collideWithPowerUps(instance, options)

    const { instances, notify } = options
    const enemies = Object.values(instances).filter(
      ({ type }) => type === "goomba",
    )
    enemies.forEach((enemy) => {
      if (collidesWith(instance, enemy, "enemy")) {
        notify({
          id: "type:change",
          payload: {
            id: instance.type,
            type: [
              enableBaseMario(),
              enableModernControls(),
              enableClampToBounds(),
              enableJump(),
              enableCollisionsDebug(),
            ],
          },
        })
        notify({ id: "instance:remove", payload: enemy.id })
      }
    })
  },
})

const enableFireMario = () => ({
  draw,

  "input:press": (instance, { id, action }) => {
    if (id.endsWith("input0") && action === "fire") {
      console.log("Fire!")
    }
  },

  "game:update": (instance, dt, options) => {
    instance.size = [64, 64, 0]
    instance.speed = 350
    instance.backgroundColor = "#ff8c00" // OrangeRed (Fire)

    collideWithPowerUps(instance, options)

    const { instances, notify } = options
    const enemies = Object.values(instances).filter(
      ({ type }) => type === "goomba",
    )
    enemies.forEach((enemy) => {
      if (collidesWith(instance, enemy, "enemy")) {
        notify({
          id: "type:change",
          payload: {
            id: instance.type,
            type: [
              enableBaseMario(),
              enableSuperMario(),
              enableModernControls(),
              enableClampToBounds(),
              enableJump(),
              enableCollisionsDebug(),
            ],
          },
        })
        notify({ id: "instance:remove", payload: enemy.id })
      }
    })
  },
})

export default {
  types: {
    ...enableControls(),

    mario: [
      enableBaseMario(),
      // enableSuperMario(),
      // enableFireMario(),
      enableModernControls(),
      enableClampToBounds(),
      enableJump(),
      enableCollisionsDebug(),
    ],

    platform: { draw },

    mushroom: [{ draw }, enableCollisionsDebug()],

    fireFlower: [{ draw }, enableCollisionsDebug()],

    goomba: [{ draw }, enableCollisionsDebug()],
  },

  instances: {
    ...createControls("input0", {
      ArrowLeft: "left",
      ArrowRight: "right",
      Space: "jump",
      KeyA: "left",
      KeyD: "right",
      KeyF: "fire",
    }),

    mario: {
      type: "mario",
      layer: 1,
      position: [100, 64, 0],
      size: [32, 32, 0],
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
      position: [0, 32, 0],
      size: [800, 32, 0],
      backgroundColor: "#654321", // Brown
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    platform1: {
      type: "platform",
      position: [200, 128, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321", // Brown
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    powerUp1: {
      type: "mushroom",
      layer: 1,
      position: [250, 160, 0],
      size: [32, 32, 0],
      backgroundColor: "#ee7777", // Pinkish
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    platform2: {
      type: "platform",
      position: [450, 224, 0],
      size: [150, 32, 0],
      backgroundColor: "#654321", // Brown
      collisions: {
        platform: {
          shape: "platform",
        },
      },
    },

    powerUp2: {
      type: "fireFlower",
      layer: 1,
      position: [500, 256, 0],
      size: [32, 32, 0],
      backgroundColor: "#ffdd00", // Yellow
      collisions: {
        powerup: {
          shape: "rectangle",
        },
      },
    },

    enemy1: {
      type: "goomba",
      position: [32, 64, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000", // Maroon
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },

    enemy2: {
      type: "goomba",
      position: [400, 64, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000", // Maroon
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },

    enemy3: {
      type: "goomba",
      position: [640, 64, 0],
      size: [32, 32, 0],
      backgroundColor: "#800000", // Maroon
      collisions: {
        enemy: {
          shape: "rectangle",
        },
      },
    },
  },
}
