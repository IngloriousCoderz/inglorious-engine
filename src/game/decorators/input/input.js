const DEFAULT_PARAMS = {
  name: "input0",
}

export function enableInput() {
  return {
    "input:axis"(instance, { id, action, value }) {
      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = value
    },

    "input:press"(instance, { id, action }) {
      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = true
    },

    "input:release"(instance, { id, action }) {
      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = false
    },
  }
}

export function createInput(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "input", mapping }
}
