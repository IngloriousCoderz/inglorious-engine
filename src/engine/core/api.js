import { createSelector as _createSelector } from "./select.js"

const readOnlyProxyHandler = (id, path = []) => ({
  set(target, property) {
    const fullPath = [...path, property].join(".")
    throw new Error(
      `Cannot set property "${fullPath}" on entity "${id}". Entities are read-only. Use api.notify() to dispatch actions.`,
    )
  },

  get(target, property) {
    // This is a proxy, don't proxy the proxy
    if (property === "__isProxy") {
      return true
    }

    const value = target[property]

    if (
      value &&
      typeof value === "object" &&
      !Object.isFrozen(value) &&
      !value.__isProxy
    ) {
      return new Proxy(value, readOnlyProxyHandler(id, [...path, property]))
    }

    return value
  },
})

export function createApi(store, config) {
  const _entitySelectors = {}

  const createSelector = (inputSelectors, resultFunc) => {
    const selector = _createSelector(inputSelectors, resultFunc)
    return () => selector(store.getState())
  }

  const _entitiesSelector = createSelector(
    [(state) => state.entities],
    (entities) => entities,
  )

  const getEntities = () => {
    const entities = _entitiesSelector()

    if (config.devMode && entities) {
      return new Proxy(entities, {
        set(target, property) {
          throw new Error(
            `Cannot set property "${String(
              property,
            )}" on the entities map. Entities are read-only. Use api.notify() to dispatch actions.`,
          )
        },
        get(target, property) {
          const entity = target[property]
          return entity && typeof entity === "object"
            ? new Proxy(entity, readOnlyProxyHandler(property))
            : entity
        },
      })
    }
    return entities
  }

  const getEntity = (id) => {
    if (!_entitySelectors[id]) {
      _entitySelectors[id] = createSelector(
        [(state) => state.entities],
        (entities) => entities[id],
      )
    }

    const entity = _entitySelectors[id]()

    if (config.devMode && entity) {
      return new Proxy(entity, readOnlyProxyHandler(id))
    }

    return entity
  }

  const notify = (type, payload) => {
    store.notify(type, payload)
  }

  const dispatch = (action) => {
    store.dispatch(action)
  }

  const getType = (id) => store.getOriginalTypes()?.[id]

  return {
    createSelector,
    getEntities,
    getEntity,
    getType,
    notify,
    dispatch,
  }
}
