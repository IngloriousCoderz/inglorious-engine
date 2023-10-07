export function keyboardType(events = {}) {
  return {
    'keyboard:keyDown'(instance, event) {
      instance[event.payload] = true
    },

    'keyboard:keyUp'(instance, event) {
      instance[event.payload] = false
    },

    ...events,
  }
}

export function keyboardInstance() {
  return {
    type: 'keyboard',
  }
}
