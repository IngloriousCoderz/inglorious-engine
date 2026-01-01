export function createApi(store, extras) {
  return {
    getTypes: store.getTypes,
    getType: store.getType,
    setType: store.setType,
    getEntities: store.getState,
    getEntity: (id) => store.getState()[id],
    dispatch: store.dispatch,
    notify: store.notify,
    ...extras,
  }
}
