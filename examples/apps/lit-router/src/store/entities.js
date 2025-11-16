export const entities = {
  router: {
    type: "router",
    routes: {
      "/": "home",
      "/users": "userList",
      "/users/:userId": "userDetail",
      "/users/:userId/posts": "postList",
      "/posts": "postList",
      "*": "notFound",
    },
    path: "/",
    route: null,
    params: {},
    query: {},
    hash: "",
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
    posts: [
      { id: "1", text: "Hello from Alice!", authorId: "1" },
      { id: "2", text: "Hello from Bob!", authorId: "2" },
    ],
  },
}
