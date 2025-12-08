import type { TypesConfig } from "@inglorious/store"
import { createStore } from "@inglorious/web"

import type { AppEntity, AppState } from "../../types"
import { app } from "../app"
import { message } from "../message/message"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore<AppEntity, AppState>({
  types: { app, message } as unknown as TypesConfig<AppEntity>,
  entities,
  middlewares,
})
