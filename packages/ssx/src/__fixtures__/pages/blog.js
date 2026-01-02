import { html } from "@inglorious/web"

import { data } from "../api/posts.js"
import { nav } from "../components/nav.js"

export const blog = {
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
    return html`<h1>${entity.name}'s Blog</h1>
      ${nav.render()}
      <ul>
        ${entity.posts?.map(
          (post) =>
            html`<li>
              <a href="/posts/${post.id}">${post.date} - ${post.title}</a>
            </li>`,
        )}
      </ul>`
  },
}

export const title = (entity) => `${entity.name}'s Blog`
export const meta = {
  description: "A page that pre-fetches data before rendering",
}
export async function load(entity) {
  entity.posts = await fetchPosts()
}

async function fetchPosts() {
  return await data
}
