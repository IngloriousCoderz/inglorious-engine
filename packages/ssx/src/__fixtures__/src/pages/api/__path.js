import { html } from "@inglorious/web"

import { nav } from "../../components/nav.js"

export const api = {
  render() {
    return html`<h1>API</h1>
      ${nav.render()}`
  },
}
