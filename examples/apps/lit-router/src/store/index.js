import { createStore } from "@inglorious/lit"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { router } from "./types/router"
import { home } from "./types/home"
import { userList } from "./types/user-list"
import { userDetail } from "./types/user-detail"

export const store = createStore({
  types: { router, home, userList, userDetail },
  entities,
  middlewares,
})
