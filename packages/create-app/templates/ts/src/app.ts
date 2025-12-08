import { type Api, html } from "@inglorious/web"

export const app = {
  render(api: Api) {
    return html`<h1>
      ${api.render("message1")}, ${api.render("message2")},
      ${api.render("message3")}!
    </h1>`
  },
}
