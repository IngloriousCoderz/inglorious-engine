import { html } from "lit-html"
import { form } from "./form/form"
import { list } from "./list/list"
import { footer } from "./footer/footer"

export const app = {
  render(api) {
    const entities = api.getEntities()
    return html`${form.render(entities.form, api)}
    ${list.render(entities.list, api)} ${footer.render(entities.footer, api)}`
  },
}
