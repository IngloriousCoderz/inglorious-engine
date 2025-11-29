import { createStore, router } from "@inglorious/web"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { home } from "./types/home"
import { notFound } from "./types/not-found"
import { postList } from "./types/post-list"
import { userDetail } from "./types/user-detail"
import { userList } from "./types/user-list"

export const store = createStore({
  types: { router, home, userList, userDetail, postList, notFound },
  entities,
  middlewares,
})
