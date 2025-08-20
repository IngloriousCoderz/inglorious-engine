const DEFAULT_PARAMS = {
  name: "input0",
}

export function input() {
  return {
    inputAxis(instance, { id, action, value }) {
      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = value
    },

    inputPress(instance, { id, action }) {
      if (!id.endsWith(instance.id)) {
        return
      }

      instance[action] = true
    },

    inputRelease(instance, { id, action }) {
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
