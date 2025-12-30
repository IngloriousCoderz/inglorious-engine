import { html } from "@inglorious/web"

export const index = {
  render() {
    return html`<h1>Index</h1>
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a> |
        <a href="/posts">Posts</a>
      </nav>`
  },
}
