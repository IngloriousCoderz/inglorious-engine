const DEFAULT_PARAMS = {
  name: "input0",
}

export function input() {
  return {
    inputAxis(entity, { id, action, value }, api) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = value

      api.notify(action, { id: entity.id, value })
    },

    inputPress(entity, { id, action }, api) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = true

      api.notify(action, { id: entity.id })
    },

    inputRelease(entity, { id, action }, api) {
      if (!id.endsWith(entity.id)) {
        return
      }

      entity[action] = false

      api.notify(`${action}End`, { id: entity.id })
    },
  }
}

export function createInput(name = DEFAULT_PARAMS.name, mapping = {}) {
  return { id: name, type: "input", mapping }
}
