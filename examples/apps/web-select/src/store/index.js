import { createStore } from "@inglorious/web"
import { select } from "@inglorious/web"
import { entities } from "./entities.js"
import { middlewares } from "./middlewares.js"

export const store = createStore({
  types: { select },
  entities,
  middlewares,
})
