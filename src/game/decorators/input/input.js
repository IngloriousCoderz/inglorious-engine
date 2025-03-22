const DEFAULT_PARAMS = {
  name: "input0",
}

export function enableInput() {
  return (type) => ({
    ...type,

    "input:axis"(instance, event) {
      const { id, action, value } = event.payload

      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = value
    },

    "input:press"(instance, event) {
      const { id, action } = event.payload

      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = true
    },

    "input:release"(instance, event) {
      const { id, action } = event.payload

      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = false
    },
  })
}

export function createInput(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "input", mapping }
}
