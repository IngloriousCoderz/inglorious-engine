import { html } from "@inglorious/lit"

export const userDetail = {
  render(entity, api) {
    const router = api.getEntity("router")
    const user = entity.users.find((user) => user.id === router.params.userId)

    return html`
      <div class="user-detail">
        <button @click=${() => api.notify("navigate", -1)}>← Back</button>

        <h1>${user?.name || "User not found"}</h1>

        ${user
          ? html`
              <p>Email: ${user.email}</p>
              <p>ID: ${user.id}</p>
            `
          : ""}
      </div>
    `
  },
}
