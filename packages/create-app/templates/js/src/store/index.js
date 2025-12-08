import { createStore } from "@inglorious/web"

import { app } from "../app"
import { message } from "../message/message"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { app, message },
  entities,
  middlewares,
})
