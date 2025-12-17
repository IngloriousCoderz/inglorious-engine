import { html } from "@inglorious/web"

export const app = {
  render(api) {
    return html`
      <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1>Select</h1>

        <div style="margin-bottom: 20px;">
          <h2>Single Select</h2>
          ${api.render("countrySelect")}
        </div>

        <div style="margin-bottom: 20px;">
          <h2>Multi Select</h2>
          ${api.render("multiSelect")}
        </div>
      </div>
    `
  },
}
