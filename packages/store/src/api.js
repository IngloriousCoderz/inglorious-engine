import { createSelector as _createSelector } from "./select.js"

export function createApi(store) {
  const createSelector = (inputSelectors, resultFunc) => {
    const selector = _createSelector(inputSelectors, resultFunc)
    return () => selector(store.getState())
  }

  const getTypes = () => store.getTypes()

  const getEntities = () => store.getState()

  const getEntity = (id) => getEntities()[id]

  return {
    createSelector,
    getTypes,
    getEntities,
    getEntity,
    dispatch: store.dispatch,
    notify: store.notify,
  }
}
