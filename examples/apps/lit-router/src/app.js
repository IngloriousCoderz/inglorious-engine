import { html } from "@inglorious/lit"

export const app = {
  render(api) {
    const router = api.getEntity("router")

    return html`
      <div class="router">
        <nav>
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/posts">Posts</a>
        </nav>

        <main>
          ${router.route
            ? api.render(router.route, { allowStatic: true })
            : html`<div>Route not found: ${router.path}</div>`}
        </main>
      </div>
    `
  },
}
