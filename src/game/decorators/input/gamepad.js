const DEFAULT_PARAMS = {
  name: "gamepad0",
}

export function enableGamepad() {
  return {
    update(instance, dt, { notify }) {
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

    gamepadAxis(instance, { id, axis, value }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[axis]
      instance[action] = value
      notify("inputAxis", { id, action, value })
    },

    gamepadPress(instance, { id, button }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (!instance[action]) {
        instance[action] = true
        notify("inputPress", { id, action })
      }
    },

    gamepadRelease(instance, { id, button }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (instance[action]) {
        instance[action] = false
        notify("inputRelease", { id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad", mapping }
}
