export function keyboardType(events = {}) {
  return {
    'keyboard:keyDown'(instance, { payload }) {
      instance[payload] = true
    },

    'keyboard:keyUp'(instance, { payload }) {
      instance[payload] = false
    },

    ...events,
  }
}

export function keyboardInstance() {
  return {
    type: 'keyboard',
  }
}
