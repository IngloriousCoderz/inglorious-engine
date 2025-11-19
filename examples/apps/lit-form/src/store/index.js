import { createStore } from "@inglorious/lit"

import { app } from "../app"
import { form } from "../form/form"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { app, form },
  entities,
  middlewares,
})
