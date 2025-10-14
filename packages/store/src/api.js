export function createApi(store, extras) {
  return {
    getTypes: store.getTypes,
    getEntities: store.getState,
    getEntity: (id) => store.getState()[id],
    dispatch: store.dispatch,
    notify: store.notify,
    ...extras,
  }
}
