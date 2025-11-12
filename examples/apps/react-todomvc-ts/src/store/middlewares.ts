import { createDevtools } from "@inglorious/store/client/devtools"
import type { Middleware } from "@inglorious/store"

import type { TodoListEntity, TodoListState } from "../../types"

export const middlewares: Middleware<TodoListEntity, TodoListState>[] = []

if (import.meta.env.DEV) {
  middlewares.push(createDevtools<TodoListEntity, TodoListState>().middleware)
}
