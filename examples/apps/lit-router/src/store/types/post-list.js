import { html } from "@inglorious/lit"

export const postList = {
  render(entity, api) {
    const { params } = api.getEntity("router")

    const { users } = api.getEntity("userList")
    const user = users.find((user) => user.id === params.userId)

    const filteredPosts = user
      ? entity.posts.filter((post) => post.authorId === user.id)
      : entity.posts

    return html`<div class="post-list">
      ${user &&
      html`<button @click=${() => api.notify("navigate", -1)}>← Back</button>`}

      <h1>${user ? `${user.name}'s` : ""} Posts</h1>

      <ul>
        ${filteredPosts.map((post) => html` <li>${post.text}</li> `)}
      </ul>
    </div>`
  },
}
