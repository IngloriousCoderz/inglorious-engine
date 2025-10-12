import { createStore } from "@inglorious/store"
import { connectDevTools } from "@inglorious/store/client/dev-tools"

import { entities } from "./entities"
import { types } from "./types"
import { createReactStore } from "@inglorious/react-store"

const config = { mode: "batched", skippedEvents: ["create"] }

export const store = createStore({ ...config, types, entities })

export const { Provider, useSelector, useNotify } = createReactStore(
  store,
  config,
)

if (import.meta.env.DEV) {
  connectDevTools(store)
}
