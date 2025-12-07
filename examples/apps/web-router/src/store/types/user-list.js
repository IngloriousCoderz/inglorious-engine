import { html, repeat } from "@inglorious/web"

export const userList = {
  render(entity) {
    return html`
      <div class="user-list">
        <h1>Users</h1>
        <ul>
          ${repeat(
            entity.users,
            (user) => user.id,
            (user) => html`
              <li>
                <a href="/users/${user.id}">${user.name}</a>
              </li>
            `,
          )}
        </ul>
      </div>
    `
  },
}
