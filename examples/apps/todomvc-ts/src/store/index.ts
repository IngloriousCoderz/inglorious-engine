import { createStore, type TypesConfig } from "@inglorious/store"
import { createReactStore } from "@inglorious/react-store"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { types } from "./types"
import type { TodoListEntity, TodoListState } from "../../types"

export const store = createStore<TodoListEntity, TodoListState>({
  types: types as unknown as TypesConfig<TodoListEntity>,
  entities,
  middlewares,
})

export const { Provider, useSelector, useNotify } = createReactStore(store)
