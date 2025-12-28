import { html } from "@inglorious/web"

export const about = {
  render(entity) {
    return html`<h1>About ${entity.name}</h1>
      <nav><a href="/">Home</a></nav>`
  },
}

export const title = "About"

export const meta = {
  description: "About page",
}
