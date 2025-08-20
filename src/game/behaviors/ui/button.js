export function button() {
  return {
    states: {
      default: {
        instanceClick(instance) {
          instance.state = "pressed"
        },
      },

      pressed: {
        instanceRelease(instance) {
          instance.state = "default"
        },
      },
    },
  }
}
