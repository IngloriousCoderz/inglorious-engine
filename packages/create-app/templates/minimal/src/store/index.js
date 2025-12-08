import { createStore } from "@inglorious/web"

import { app } from "../app.js"
import { message } from "../message/message.js"
import { entities } from "./entities.js"
import { middlewares } from "./middlewares.js"

export const store = createStore({
  types: { app, message },
  entities,
  middlewares,
})
