import { Provider, useSelector } from "react-redux"

export function createReactStore(store) {
  function StoreProvider({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  function useNotify() {
    return store._api.notify
  }

  return { Provider: StoreProvider, useSelector, useNotify }
}
