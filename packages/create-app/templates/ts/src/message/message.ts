import { type Api, html } from "@inglorious/web"

import type { MessageEntity } from "../../types"

export const message = {
  click(entity: MessageEntity) {
    entity.isUpperCase = !entity.isUpperCase
  },

  render(entity: MessageEntity, api: Api) {
    const message = entity.isUpperCase ? entity.who.toUpperCase() : entity.who
    return html`<span @click=${() => api.notify(`#${entity.id}:click`)}
      >Hello ${message}</span
    >`
  },
}
