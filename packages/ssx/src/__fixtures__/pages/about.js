import { html } from "@inglorious/web"

export const about = {
  render(entity) {
    return html`<h1>About ${entity.name}</h1>
      <nav><a href="/">Home</a></nav>`
  },
}
