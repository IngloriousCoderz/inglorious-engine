export function gamepadType() {
  return {
    gamepad: {
      'game:update'(instance, event, { instances, notify }) {
        navigator.getGamepads().forEach((gamepad, index) => {
          if (gamepad == null) {
            return
          }

          const input = instances[`input${index}`]
          if (input == null) {
            return null
          }

          gamepad.axes.forEach((axis, index) => {
            notify({
              id: 'gamepad:axis',
              payload: { id: `Axis${index}`, value: axis },
            })
          })

          gamepad.buttons.forEach((button, index) => {
            const id = button.pressed ? 'gamepad:press' : 'gamepad:release'
            notify({ id, payload: `Btn${index}` })
          })
        })
      },

      'gamepad:axis'(instance, event, { notify }) {
        instance[event.payload.id] = event.payload.value
        notify({ id: 'input:axis', payload: event.payload })
      },

      'gamepad:press'(instance, event, { notify }) {
        if (!instance[event.payload]) {
          instance[event.payload] = true
          notify({ id: 'input:press', payload: event.payload })
        }
      },

      'gamepad:release'(instance, event, { notify }) {
        if (instance[event.payload]) {
          instance[event.payload] = false
          notify({ id: 'input:release', payload: event.payload })
        }
      },
    },
  }
}

export function gamepadInstances() {
  return {
    gamepad0: { type: 'gamepad' },
    gamepad1: { type: 'gamepad' },
    gamepad2: { type: 'gamepad' },
    gamepad3: { type: 'gamepad' },
  }
}
