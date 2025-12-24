import { html } from "@inglorious/web"

export const post = {
  render(entity) {
    return html`<h1>Post ${entity.title}</h1>`
  },
}

// export async function getStaticPaths() {
//   return [{ path: "/posts/1", params: { id: "1" } }, "/posts/2"]
// }
