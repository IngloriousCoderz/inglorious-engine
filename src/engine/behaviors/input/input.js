const DEFAULT_PARAMS = {
  name: "input0",
}

export function input() {
  return {
    inputAxis(entity, { id, action, value }) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = value
    },

    inputPress(entity, { id, action }) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = true
    },

    inputRelease(entity, { id, action }) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = false
    },
  }
}

export function createInput(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "input", mapping }
}
