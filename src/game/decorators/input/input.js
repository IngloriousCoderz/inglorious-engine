const DEFAULT_PARAMS = {
  id: 0,
}

export function enableInput() {
  return (type) => ({
    ...type,

    "input:axis"(instance, event) {
      const { id, action, value } = event.payload

      if (instance.id !== `input${id}`) {
        return
      }

      instance[action] = value
    },

    "input:press"(instance, event) {
      const { id, action } = event.payload

      if (instance.id !== `input${id}`) {
        return
      }

      instance[action] = true
    },

    "input:release"(instance, event) {
      const { id, action } = event.payload

      if (instance.id !== `input${id}`) {
        return
      }

      instance[action] = false
    },
  })
}

export function createInput(id = DEFAULT_PARAMS.id, mapping = {}) {
  return { id: `input${id}`, type: "input", mapping }
}
