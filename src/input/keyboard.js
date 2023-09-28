export function keyboardType() {
  return {
    'keyboard:keyDown'(instance, { payload }) {
      instance[payload] = true
    },

    'keyboard:keyUp'(instance, { payload }) {
      instance[payload] = false
    },
  }
}

export function keyboardInstance() {
  return {
    type: 'keyboard',
  }
}
