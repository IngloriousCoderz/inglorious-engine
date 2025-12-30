export const entities = {
  router: {
    type: "router",
    routes: {
      "/": "home",
      "/users": "userList",
      "/users/:userId": "userDetail",
      "/users/:userId/posts": "postList",
      "/posts": "postList",
      "/lazy-type": () => import("../views/lazy-type"),
      "/lazy-entity": () => import("../views/lazy-entity"),
      "/lazy-data": () => import("../views/lazy-data"),
      "/admin": "adminPage",
      "/login": "loginPage",
      "*": "notFound",
    },
  },

  userList: {
    type: "userList",
    users: [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ],
  },

  userDetail: {
    type: "userDetail",
  },

  postList: {
    type: "postList",
    posts: [],
  },

  lazyEntity: {
    type: "lazyEntity",
    message: "Hi!",
  },

  lazyData: {
    type: "lazyData",
    posts: [],
  },

  adminPage: {
    type: "adminPage",
  },

  loginPage: {
    type: "loginPage",
    username: "",
    password: "",
  },
}
