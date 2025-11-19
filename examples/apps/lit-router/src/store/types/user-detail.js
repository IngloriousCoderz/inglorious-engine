import { html } from "@inglorious/lit"

const BACK = -1

export const userDetail = {
  routeChange(entity, { path, params }, api) {
    if (path !== `/users/${params.userId}`) return

    const { users } = api.getEntity("userList")
    entity.user = users.find((user) => user.id === params.userId)
  },

  render(entity, api) {
    const { user } = entity

    if (!user) return null

    return html`
      <div class="user-detail">
        <button @click=${() => api.notify("navigate", BACK)}>← Back</button>

        <h1>${user.name}</h1>

        <p>Email: ${user.email}</p>
        <p>Posts: <a href="/users/${user.id}/posts">posts</a></p>
      </div>
    `
  },
}
