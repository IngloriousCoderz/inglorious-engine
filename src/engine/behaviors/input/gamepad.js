const DEFAULT_PARAMS = {
  name: "gamepad_input0",
}

export function gamepadsPoller() {
  return {
    start(entity) {
      entity.gamepadStateCache ??= {}
    },

    update(entity, dt, api) {
      navigator.getGamepads().forEach((gamepad) => {
        if (gamepad == null) {
          return
        }

        const cache = (entity.gamepadStateCache[gamepad.index] ??= {
          axes: [],
          buttons: [],
        })

        gamepad.axes.forEach((axis, index) => {
          if (axis === cache.axes[index]) {
            return
          }

          api.notify("gamepadAxis", {
            gamepadIndex: gamepad.index,
            axis: `Axis${index}`,
            value: axis,
          })
          cache.axes[index] = axis
        })

        gamepad.buttons.forEach((button, index) => {
          const wasPressed = cache.buttons[index]
          const isPressed = button.pressed

          if (isPressed && !wasPressed) {
            api.notify("gamepadPress", {
              gamepadIndex: gamepad.index,
              button: `Btn${index}`,
            })
          } else if (!isPressed && wasPressed) {
            api.notify("gamepadRelease", {
              gamepadIndex: gamepad.index,
              button: `Btn${index}`,
            })
          }

          cache.buttons[index] = isPressed
        })
      })
    },
  }
}

export function gamepadListener() {
  return {
    gamepadAxis(entity, { gamepadIndex, axis, value }, api) {
      if (entity.id !== `gamepad_input${gamepadIndex}`) {
        return
      }

      const action = entity.mapping[axis]
      if (!action) {
        return
      }

      entity[action] = value
      api.notify("inputAxis", { controlId: entity.id, action, value })
    },

    gamepadPress(entity, { gamepadIndex, button }, api) {
      if (entity.id !== `gamepad_input${gamepadIndex}`) {
        return
      }

      const action = entity.mapping[button]
      if (!action) {
        return
      }

      if (!entity[action]) {
        entity[action] = true
        api.notify("inputPress", { controlId: entity.id, action })
      }
    },

    gamepadRelease(entity, { gamepadIndex, button }, api) {
      if (entity.id !== `gamepad_input${gamepadIndex}`) {
        return
      }

      const action = entity.mapping[button]
      if (!action) {
        return
      }

      if (entity[action]) {
        entity[action] = false
        api.notify("inputRelease", { controlId: entity.id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad_listener", mapping }
}
