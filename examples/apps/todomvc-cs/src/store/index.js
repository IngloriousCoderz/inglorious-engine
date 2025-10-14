import { createStore } from "@inglorious/store"
import { connectDevTools } from "@inglorious/store/client/dev-tools"

import { entities } from "./entities"
import { types } from "./types"
import { createReactStore } from "@inglorious/react-store"

export const store = createStore({ types, entities })

export const { Provider, useSelector, useNotify } = createReactStore(store)

if (import.meta.env.DEV) {
  connectDevTools(store)
}
