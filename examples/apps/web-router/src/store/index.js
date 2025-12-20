import { createStore, router } from "@inglorious/web"

import { entities } from "./entities"
import { middlewares } from "./middlewares"
import { adminPage } from "./types/admin"
import { home } from "./types/home"
import { loginPage } from "./types/login"
import { notFound } from "./types/not-found"
import { postList } from "./types/post-list"
import { requiresAuth } from "./types/requires-auth"
import { userDetail } from "./types/user-detail"
import { userList } from "./types/user-list"

export const store = createStore({
  types: {
    router,
    home,
    userList,
    userDetail,
    postList,
    adminPage: [adminPage, requiresAuth],
    loginPage,
    notFound,
  },
  entities,
  middlewares,
})
