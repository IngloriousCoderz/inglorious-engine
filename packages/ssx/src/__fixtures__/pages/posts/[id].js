import { html } from "@inglorious/web"

export const posts = {
  render() {
    return html`<h1>Posts</h1>`
  },
}

export async function getStaticPaths() {
  return [{ path: "/posts/1", params: { id: "1" } }, "/posts/2"]
}
