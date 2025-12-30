import { createStore } from "@inglorious/web"
import { select } from "@inglorious/web/select"

import { remoteSelect } from "../remote-select.js"
import { entities } from "./entities.js"
import { middlewares } from "./middlewares.js"

export const store = createStore({
  types: { select, remoteSelect },
  entities,
  middlewares,
})
