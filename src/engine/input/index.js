export function inputType(mapping = {}, events = {}) {
  return {
    input: {
      'keyboard:keyDown'(instance, event, { notify }) {
        const action = mapping[event.payload]
        instance[action] = true
        notify({ id: 'input:press', payload: action })
      },

      'keyboard:keyUp'(instance, event, { notify }) {
        const action = mapping[event.payload]
        instance[action] = false
        notify({ id: 'input:release', payload: action })
      },

      ...events,
    },
  }
}

export function inputInstance() {
  return {
    input: {
      type: 'input',
    },
  }
}
