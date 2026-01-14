import { createStore } from "@inglorious/web"

import { footer } from "../footer/footer"
import { form } from "../form/form"
import { list } from "../list/list"
import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { form, list, footer },
  entities,
  middlewares,
})
