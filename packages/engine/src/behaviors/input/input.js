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

      entity.targetIds.forEach((targetId) => {
        api.notify(action, { entityId: targetId, value })
      })
    },

    inputPress(entity, { controlId, action }, api) {
      if (!controlId.endsWith(entity.id)) {
        return
      }
      entity[action] = true

      entity.targetIds.forEach((targetId) => {
        api.notify(action, targetId)
      })
    },

    inputRelease(entity, { controlId, action }, api) {
      if (!controlId.endsWith(entity.id)) {
        return
      }
      entity[action] = false

      entity.targetIds.forEach((targetId) => {
        api.notify(`${action}End`, targetId)
      })
    },
  }
}

export function createInput(
  name = DEFAULT_PARAMS.name,
  targetIds = [],
  mapping = {},
) {
  return { id: name, type: "input", targetIds, mapping }
}
