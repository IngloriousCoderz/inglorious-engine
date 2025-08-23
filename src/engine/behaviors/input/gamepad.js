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
            id: gamepad.index,
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
              id: gamepad.index,
              button: `Btn${index}`,
            })
          } else if (!isPressed && wasPressed) {
            api.notify("gamepadRelease", {
              id: gamepad.index,
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
    gamepadAxis(entity, { id, axis, value }, api) {
      if (entity.id !== `gamepad_input${id}`) {
        return
      }

      const action = entity.mapping[axis]
      if (!action) {
        return
      }

      entity[action] = value
      api.notify("inputAxis", { id: entity.id, action, value })
    },

    gamepadPress(entity, { id, button }, api) {
      if (entity.id !== `gamepad_input${id}`) {
        return
      }

      const action = entity.mapping[button]
      if (!action) {
        return
      }

      if (!entity[action]) {
        entity[action] = true
        api.notify("inputPress", { id: entity.id, action })
      }
    },

    gamepadRelease(entity, { id, button }, api) {
      if (entity.id !== `gamepad_input${id}`) {
        return
      }

      const action = entity.mapping[button]
      if (!action) {
        return
      }

      if (entity[action]) {
        entity[action] = false
        api.notify("inputRelease", { id: entity.id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad_listener", mapping }
}
