import { createStore } from "@inglorious/web"

import { footer } from "@/components/footer"
import { form } from "@/components/form"
import { list } from "@/components/list"

import { entities } from "./entities"
import { middlewares } from "./middlewares"

export const store = createStore({
  types: { form, list, footer },
  entities,
  middlewares,
})
