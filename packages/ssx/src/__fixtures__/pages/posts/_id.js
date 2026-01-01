import { html } from "@inglorious/web"

import { posts as postsData } from "../../posts.js"

export const post = {
  async routeChange(entity, payload, api) {
    if (payload.route !== entity.type) return
    const id = Number(payload.params.id)
    if (entity.post?.id === id) return

    const entityId = entity.id
    const post = await fetchPost(id)
    api.notify(`#${entityId}:dataFetchSuccess`, post)
  },

  dataFetchSuccess(entity, post) {
    entity.post = post
  },

  render(entity) {
    return html`<h1>Post ${entity.post?.title}</h1>`
  },
}

export async function getStaticPaths() {
  return postsData.map((post) => `/posts/${post.id}`)
}

export async function load(entity, page) {
  const id = Number(page.params.id)
  entity.post = await fetchPost(id)
}

async function fetchPost(id) {
  return await postsData.find((post) => post.id === id)
}
