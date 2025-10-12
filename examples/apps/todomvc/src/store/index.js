import { createStore } from "@inglorious/store"
import { connectDevTools } from "@inglorious/store/client/dev-tools"

import { entities } from "./entities"
import { types } from "./types"

export const store = createStore({ types, entities })

if (import.meta.env.DEV) {
  connectDevTools(store)
}
