import { createStore } from "@inglorious/lit"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { form } from "../form/form"
import { app } from "../app"

export const store = createStore({
  types: { app, form },
  entities,
  middlewares,
})
