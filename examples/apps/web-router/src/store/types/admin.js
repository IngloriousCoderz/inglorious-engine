import { html } from "@inglorious/web"

export const adminPage = {
  routeChange(entity) {
    entity.username = JSON.parse(localStorage.getItem("user")).username
  },

  logout(entity, _, api) {
    localStorage.removeItem("user")
    api.notify("navigate", {
      to: window.location.pathname,
      replace: true,
      force: true,
    })
  },

  render(entity, api) {
    return html`<h1>Admin Page</h1>
      <p>You're in! Welcome ${entity.username}!</p>
      <button @click=${() => api.notify(`#${entity.id}:logout`)}>
        Logout
      </button>`
  },
}
