export function gamepadType(events = {}) {
  return {
    gamepad: {
      'gamepad:press'(instance, event) {
        instance[event.payload] = true
      },

      'gamepad:release'(instance, event) {
        instance[event.payload] = false
      },

      ...events,
    },
  }
}

export function gamepadInstance() {
  return {
    gamepad: {
      type: 'gamepad',
    },
  }
}
