import { createStore } from "@inglorious/web"

import { message } from "../message/message.js"
import { entities } from "./entities.js"
import { middlewares } from "./middlewares.js"

export const store = createStore({
  types: { message },
  entities,
  middlewares,
})
