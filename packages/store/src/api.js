export function createApi(store, extras) {
  const getTypes = () => store.getTypes()

  const getEntities = () => store.getState()

  const getEntity = (id) => getEntities()[id]

  return {
    getTypes,
    getEntities,
    getEntity,
    dispatch: store.dispatch,
    notify: store.notify,
    ...extras,
  }
}
