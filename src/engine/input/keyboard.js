export function keyboardType() {
  return {
    keyboard: {
      'keyboard:keyDown'(instance, event, { notify }) {
        instance[event.payload] = true
        notify({ id: 'input:press', payload: event.payload })
      },

      'keyboard:keyUp'(instance, event, { notify }) {
        instance[event.payload] = false
        notify({ id: 'input:release', payload: event.payload })
      },
    },
  }
}

export function keyboardInstance() {
  return {
    keyboard: {
      type: 'keyboard',
    },
  }
}
