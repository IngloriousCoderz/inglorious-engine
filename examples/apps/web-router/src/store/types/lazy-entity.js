import { html } from "@inglorious/web"

export const lazyEntity = {
  render(entity) {
    return html`<h1>Lazy Entity</h1>
      <p>
        Not only this route was loaded lazily, but it has an associated entity.
      </p>
      <p>The entity says: "${entity.message}"</p>`
  },
}
