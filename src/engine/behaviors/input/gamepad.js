const DEFAULT_PARAMS = {
  name: "gamepad0",
}

export function gamepad() {
  return {
    update(entity, dt, { notify }) {
      navigator.getGamepads().forEach((gamepad) => {
        if (gamepad == null) {
          return
        }

        gamepad.axes.forEach((axis, index) => {
          notify("gamepadAxis", {
            id: gamepad.index,
            axis: `Axis${index}`,
            value: axis,
          })
        })

        gamepad.buttons.forEach((button, index) => {
          const id = button.pressed ? "gamepadPress" : "gamepadRelease"
          notify(id, { id: gamepad.index, button: `Btn${index}` })
        })
      })
    },

    gamepadAxis(entity, { id, axis, value }, { notify }) {
      if (entity.id !== `gamepad${id}`) {
        return
      }

      const action = entity.mapping[axis]
      entity[action] = value
      notify("inputAxis", { id, action, value })
    },

    gamepadPress(entity, { id, button }, { notify }) {
      if (entity.id !== `gamepad${id}`) {
        return
      }

      const action = entity.mapping[button]
      if (!entity[action]) {
        entity[action] = true
        notify("inputPress", { id, action })
      }
    },

    gamepadRelease(entity, { id, button }, { notify }) {
      if (entity.id !== `gamepad${id}`) {
        return
      }

      const action = entity.mapping[button]
      if (entity[action]) {
        entity[action] = false
        notify("inputRelease", { id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad", mapping }
}
