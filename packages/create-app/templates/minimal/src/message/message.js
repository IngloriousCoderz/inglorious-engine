import { html } from "@inglorious/web"

export const message = {
  click(entity) {
    entity.isUpperCase = true
  },

  render(entity, api) {
    const message = entity.isUpperCase ? entity.who.toUpperCase() : entity.who
    return html`<span @click=${() => api.notify(`#${entity.id}:click`)}
      >Hello ${message}</span
    >`
  },
}
