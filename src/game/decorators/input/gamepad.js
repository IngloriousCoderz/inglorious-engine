const DEFAULT_PARAMS = {
  id: 0,
}

export function enableGamepad() {
  return (type) => ({
    ...type,

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

      const action = instance.mapping[axis]
      instance[action] = value
      notify({ id: 'input:axis', payload: { id, action, value } })
    },

    'gamepad:press'(instance, event, { notify }) {
      const { id, button } = event.payload

      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (!instance[action]) {
        instance[action] = true
        notify({ id: 'input:press', payload: { id, action } })
      }
    },

    'gamepad:release'(instance, event, { notify }) {
      const { id, button } = event.payload

      if (instance.id !== `gamepad${id}`) {
        return
      }

      const action = instance.mapping[button]
      if (instance[action]) {
        instance[action] = false
        notify({ id: 'input:release', payload: { id, action } })
      }
    },
  })
}

export function createGamepad(id = DEFAULT_PARAMS.id, mapping = {}) {
  return { id: `gamepad${id}`, type: 'gamepad', mapping }
}
