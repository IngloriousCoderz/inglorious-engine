import { createStore, router } from "@inglorious/lit"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { home } from "./types/home"
import { userList } from "./types/user-list"
import { userDetail } from "./types/user-detail"
import { postList } from "./types/post-list"
import { notFound } from "./types/not-found"

export const store = createStore({
  types: { router, home, userList, userDetail, postList, notFound },
  entities,
  middlewares,
})
