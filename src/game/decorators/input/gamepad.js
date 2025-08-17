const DEFAULT_PARAMS = {
  name: "gamepad0",
}

export function enableGamepad() {
  return {
    "game:update"(instance, dt, { notify }) {
      navigator.getGamepads().forEach((gamepad) => {
        if (gamepad == null) {
          return
        }

        gamepad.axes.forEach((axis, index) => {
          notify("gamepad:axis", {
            id: gamepad.index,
            axis: `Axis${index}`,
            value: axis,
          })
        })

        gamepad.buttons.forEach((button, index) => {
          const id = button.pressed ? "gamepad:press" : "gamepad:release"
          notify(id, { id: gamepad.index, button: `Btn${index}` })
        })
      })
    },

    "gamepad:axis"(instance, { id, axis, value }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[axis]
      instance[action] = value
      notify("input:axis", { id, action, value })
    },

    "gamepad:press"(instance, { id, button }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (!instance[action]) {
        instance[action] = true
        notify("input:press", { id, action })
      }
    },

    "gamepad:release"(instance, { id, button }, { notify }) {
      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (instance[action]) {
        instance[action] = false
        notify("input:release", { id, action })
      }
    },
  }
}

export function createGamepad(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "gamepad", mapping }
}
