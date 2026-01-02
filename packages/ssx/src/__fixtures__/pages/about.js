import { html } from "@inglorious/web"

import { nav } from "../components/nav.js"

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
      ${nav.render()}`
  },
}

export const title = "About"

export const meta = {
  description: "About page",
}

export const styles = ["./style.css"]

export const scripts = ["./ga.js"]
