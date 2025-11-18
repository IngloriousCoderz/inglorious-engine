import { html } from "@inglorious/lit"

export const app = {
  render(api) {
    return html`${api.render("form")}`
  },
}
