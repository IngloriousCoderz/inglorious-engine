export const readOnlyStateProxyHandler = () => ({
  set(target, property) {
    throw new Error(
      `Cannot set property "${property}" on the state. State is read-only. Use api.notify() to dispatch actions.`,
    )
  },
  get(target, property) {
    const value = target[property]
    if (property === "entities") {
      return new Proxy(value, readOnlyEntitiesProxyHandler())
    }
    return value
  },
})

export const readOnlyEntitiesProxyHandler = () => ({
  set(target, property) {
    throw new Error(
      `Cannot set property "${property}" on the entities map. Entities are read-only.`,
    )
  },

  get(target, property) {
    const entity = target[property]
    return entity && typeof entity === "object"
      ? new Proxy(entity, readOnlyEntityProxyHandler(property))
      : entity
  },
})

export const readOnlyEntityProxyHandler = (id, path = []) => ({
  set() {
    throw new Error(
      `Cannot set property "${path.join(".")}" on entity "${id}". Entities are read-only.`,
    )
  },

  get(target, property) {
    const entity = target[property]
    return entity && typeof entity === "object"
      ? new Proxy(entity, readOnlyEntityProxyHandler(property))
      : entity
  },
})
