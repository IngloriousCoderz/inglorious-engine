import { html } from "@inglorious/web"

export const about = {
  click(entity) {
    entity.name += "!"
  },

  render(entity, api) {
    return html`<h1>
        About
        <span @click=${() => api.notify(`#${entity.id}:click`)}
          >${entity.name}</span
        >
      </h1>
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> |
        <a href="/blog">Blog</a>
      </nav>`
  },
}

export const title = "About"

export const meta = {
  description: "About page",
}

export const styles = ["./style.css"]

export const scripts = ["./ga.js"]
