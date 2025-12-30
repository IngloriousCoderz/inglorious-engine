import { html } from "@inglorious/web"

export const posts = {
  async create(entity, _, api) {
    if (entity.posts && entity.posts.length) return

    const entityId = entity.id
    const posts = await fetchPosts()
    api.notify(`#${entityId}:postsFetchSuccess`, posts)
  },

  postsFetchSuccess(entity, posts) {
    entity.posts = posts
  },

  render(entity) {
    return html`<h1>Posts</h1>
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> |
        <a href="/posts">Posts</a>
      </nav>
      <ul>
        ${entity.posts?.map(
          (post) =>
            html`<li><a href="/posts/${post.id}">${post.title}</a></li>`,
        )}
      </ul>`
  },
}

async function fetchPosts() {
  return await [
    { id: 1, title: "Inglorious Store" },
    { id: 2, title: "lit-html" },
    { id: 3, title: "Inglorious Web" },
    { id: 4, title: "Inglorious SSX" },
  ]
}
