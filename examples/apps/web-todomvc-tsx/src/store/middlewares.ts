// import { multiplayerMiddleware } from "@inglorious/web"
import { createDevtools, type Middleware } from "@inglorious/web"

import type { AppEntity, AppState } from "../../types"

export const middlewares: Middleware<AppEntity, AppState>[] = [
  // multiplayerMiddleware({ blacklist: ["inputChange", "filterClick"] }),
]

if (import.meta.env.DEV) {
  middlewares.push(createDevtools<AppEntity, AppState>().middleware)
}
