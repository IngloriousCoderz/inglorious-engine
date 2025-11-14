export const entities = {
  router: {
    type: "router",
    routes: {
      "/": "home",
      "/users": "userList",
      "/users/:userId": "userDetail",
      "/posts": "postList",
      "/posts/:postId": "postDetail",
    },
    currentPath: "/",
    currentRoute: null,
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
    users: [
      { id: "1", name: "Alice", email: "alice@example.com" },
      { id: "2", name: "Bob", email: "bob@example.com" },
    ],
  },
}
