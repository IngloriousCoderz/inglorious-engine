import { html } from "@inglorious/web"

import { posts as postsData } from "../posts.js"

export const posts = {
  async routeChange(entity, payload, api) {
    if (payload.route !== entity.type) return
    if (entity.posts && entity.posts.length) return

    const entityId = entity.id
    const posts = await fetchPosts()
    api.notify(`#${entityId}:dataFetchSuccess`, posts)
  },

  dataFetchSuccess(entity, posts) {
    entity.posts = posts
  },

  render(entity) {
    return html`<h1>${entity.name}'s Posts</h1>
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

export const title = (entity) => `${entity.name}'s Posts`
export const meta = {
  description: "A page that pre-fetches data before rendering",
}
export async function load(entity) {
  entity.posts = await fetchPosts()
}

async function fetchPosts() {
  return await postsData
}
