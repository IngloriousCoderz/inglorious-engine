export function button() {
  return {
    states: {
      default: {
        entityClick(entity) {
          entity.state = "pressed"
        },
      },

      pressed: {
        entityRelease(entity) {
          entity.state = "default"
        },
      },
    },
  }
}
