const DEFAULT_PARAMS = {
  name: "input0",
}

export function input() {
  return {
    inputAxis(entity, { controlId, action, value }, api) {
      if (!controlId.endsWith(entity.id)) {
        return
      }

      entity[action] = value

      api.notify(action, { inputId: entity.id, value })
    },

    inputPress(entity, { controlId, action }, api) {
      if (!controlId.endsWith(entity.id)) {
        return
      }

      entity[action] = true

      api.notify(action, { inputId: entity.id })
    },

    inputRelease(entity, { controlId, action }, api) {
      if (!controlId.endsWith(entity.id)) {
        return
      }

      entity[action] = false

      api.notify(`${action}End`, { inputId: entity.id })
    },
  }
}

export function createInput(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "input", mapping }
}
