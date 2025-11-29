import { createStore } from "@inglorious/web"

import { app } from "../app"
import { userForm } from "../user-form/user-form"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { app, userForm },
  entities,
  middlewares,
})
