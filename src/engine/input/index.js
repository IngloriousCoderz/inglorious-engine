export function inputType(mapping = {}, events = {}) {
  return {
    input: {
      mapping,

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
              id: 'input:axis',
              payload: { id: `Axis${index}`, value: axis },
            })
          })

          gamepad.buttons.forEach((button, index) => {
            const id = button.pressed ? 'input:press' : 'input:release'
            notify({ id, payload: `Btn${index}` })
          })
        })
      },

      'input:axis'(instance, event) {
        const id = mapping[event.payload.id]
        instance[id] = event.payload.value
      },

      'input:press'(instance, event) {
        const id = mapping[event.payload]
        instance[id] = true
      },

      'input:release'(instance, event) {
        const id = mapping[event.payload]
        instance[id] = false
      },

      'keyboard:keyDown'(instance, event, { notify }) {
        notify({ id: 'input:press', payload: event.payload })
      },

      'keyboard:keyUp'(instance, event, { notify }) {
        notify({ id: 'input:release', payload: event.payload })
      },

      ...events,
    },
  }
}

export function inputInstances() {
  return {
    input0: { type: 'input' },
    input1: { type: 'input' },
    input2: { type: 'input' },
    input3: { type: 'input' },
  }
}
