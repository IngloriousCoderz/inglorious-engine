const DEFAULT_ID = 0

export function gamepadType() {
  return {
    gamepad: {
      'game:update'(instance, event, { notify }) {
        navigator.getGamepads().forEach((gamepad) => {
          if (gamepad == null) {
            return
          }

          gamepad.axes.forEach((axis, index) => {
            notify({
              id: 'gamepad:axis',
              payload: { id: gamepad.index, axis: `Axis${index}`, value: axis },
            })
          })

          gamepad.buttons.forEach((button, index) => {
            const id = button.pressed ? 'gamepad:press' : 'gamepad:release'
            notify({
              id,
              payload: { id: gamepad.index, button: `Btn${index}` },
            })
          })
        })
      },

      'gamepad:axis'(instance, event, { notify }) {
        const { id, axis, value } = event.payload

        if (instance.id !== `gamepad${id}`) {
          return
        }

        instance[instance.mapping[axis]] = value
        notify({ id: 'input:axis', payload: event.payload })
      },

      'gamepad:press'(instance, event, { notify }) {
        const { id, button } = event.payload

        if (instance.id !== `gamepad${id}`) {
          return
        }

        if (!instance[instance.mapping[button]]) {
          instance[instance.mapping[button]] = true
          notify({ id: 'input:press', payload: event.payload })
        }
      },

      'gamepad:release'(instance, event, { notify }) {
        const { id, button } = event.payload

        if (instance.id !== `gamepad${id}`) {
          return
        }

        if (instance[instance.mapping[button]]) {
          instance[instance.mapping[button]] = false
          notify({ id: 'input:release', payload: event.payload })
        }
      },
    },
  }
}

export function gamepadInstance(id = DEFAULT_ID, mapping = {}) {
  return {
    [`gamepad${id}`]: { type: 'gamepad', mapping },
  }
}
