const DEFAULT_PARAMS = {
  name: "gamepad0",
}

export function gamepad() {
  return {
    update(entity, dt, api) {
      navigator.getGamepads().forEach((gamepad) => {
        if (gamepad == null) {
          return
        }

        gamepad.axes.forEach((axis, index) => {
          api.notify("gamepadAxis", {
            id: gamepad.index,
            axis: `Axis${index}`,
            value: axis,
          })
        })

        gamepad.buttons.forEach((button, index) => {
          const id = button.pressed ? "gamepadPress" : "gamepadRelease"
          api.notify(id, { id: gamepad.index, button: `Btn${index}` })
        })
      })
    },

    gamepadAxis(entity, { id, axis, value }, api) {
      if (entity.id !== `gamepad_input${id}`) {
        return
      }

      const action = entity.mapping[axis]
      entity[action] = value
      api.notify("inputAxis", { id: entity.id, action, value })
    },

    gamepadPress(entity, { id, button }, api) {
      if (entity.id !== `gamepad_input${id}`) {
        return
      }

      const action = entity.mapping[button]
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
      if (entity[action]) {
        entity[action] = false
        api.notify("inputRelease", { id: entity.id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad", mapping }
}
