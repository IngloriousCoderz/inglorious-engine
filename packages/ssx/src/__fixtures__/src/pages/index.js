import { html } from "@inglorious/web"

import { nav } from "../components/nav.js"

export const index = {
  render() {
    return html`<h1>Index</h1>
      ${nav.render()}`
  },
}
