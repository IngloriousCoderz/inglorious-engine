import { html } from "@inglorious/web"

import { data } from "../../api/posts.js"
import { nav } from "../../components/nav.js"

export const post = {
  async routeChange(entity, payload, api) {
    if (payload.route !== entity.type) return
    const id = payload.params.slug
    if (entity.post?.id === id) return

    const entityId = entity.id
    const post = await fetchPost(id)
    api.notify(`#${entityId}:dataFetchSuccess`, post)
  },

  dataFetchSuccess(entity, post) {
    entity.post = post
  },

  render(entity) {
    if (!entity.post) return

    return html`<h1>${entity.post.title}</h1>
      ${nav.render()}
      <div>${entity.post.date}</div>
      <p>${entity.post.body}</p>`
  },
}

export async function getStaticPaths() {
  return data.map((post) => `/posts/${post.id}`)
}

export async function load(entity, page) {
  const id = page.params.slug
  entity.post = await fetchPost(id)
}

async function fetchPost(id) {
  return await data.find((post) => post.id === id)
}

// Page metadata
export const title = (entity) => entity.post.title
export const meta = {
  description: "Blog Post",
}

// Sitemap-specific metadata
export const changefreq = "monthly"
export const priority = 0.8
export const updatedAt = (entity) => entity.post.date

// RSS-specific metadata
export const pubDate = (entity) => entity.post.date
export const author = "Matteo Antony Mistretta"
export const category = "Chronicle"
