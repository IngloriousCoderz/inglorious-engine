import { html } from "@inglorious/web"

export const lazyType = {
  render() {
    return html`<h1>Lazy Loaded Route</h1>
      <p>Check your network panel: this route was loaded on demand!</p>`
  },
}
