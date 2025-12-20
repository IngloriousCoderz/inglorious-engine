import { html, when } from "@inglorious/web"

export const app = {
  render(api) {
    const router = api.getEntity("router")

    return html`
      <div class="router">
        <nav>
          <a href="/">Home</a>
          <a href="/users">Users</a>
          <a href="/posts">Posts</a>
          <a href="/broken">Broken</a>
          <a href="/lazy-type">Lazy Type</a>
          <a href="/lazy-entity">Lazy Entity</a>
          <a href="/admin">Admin Page</a>
        </nav>

        <main>
          ${when(
            router.error,
            () => html`<div>Route not found: ${router.path}</div>`,
          )}
          ${when(router.loading, () => html`<div>Loading...</div>`)}
          ${when(!router.error && !router.loading, () =>
            api.render(router.route, { allowType: true }),
          )}
        </main>
      </div>
    `
  },
}
