import { createSelector as _createSelector } from "./select.js"

export function createApi(store) {
  const createSelector = (inputSelectors, resultFunc) => {
    const selector = _createSelector(inputSelectors, resultFunc)
    return () => selector(store.getState())
  }

  const getTypes = () => store.getTypes()

  const getEntities = () => store.getState().entities

  const getEntity = (id) => getEntities()[id]

  const notify = (type, payload) => {
    store.notify(type, payload)
  }

  const dispatch = (action) => {
    store.dispatch(action)
  }

  const getType = (id) => store.getOriginalTypes()?.[id]

  return {
    createSelector,
    getTypes,
    getEntities,
    getEntity,
    getType,
    notify,
    dispatch,
  }
}
