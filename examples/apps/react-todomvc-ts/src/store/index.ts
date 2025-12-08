import { createStore, type TypesConfig } from "@inglorious/store"
import { createReactStore } from "@inglorious/react-store"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { types } from "./types"
import type { AppEntity, AppState } from "../../types"

export const store = createStore<AppEntity, AppState>({
  types: types as unknown as TypesConfig<AppEntity>,
  entities,
  middlewares,
})

export const { Provider, useSelector, useEntity, useNotify } =
  createReactStore(store)
