# Example apps index

This folder contains small demo apps that showcase features of the Inglorious Engine and its packages. Each demo has a short README and Vite-based dev workflow.

Available demos:

- [web-form](./web-form/README.md) — form type demo (validation, arrays, field helpers)
- [web-list](./web-list/README.md) — virtualized list demo (extends `list` and uses `renderItem`)
- [web-router](./web-router/README.md) — router demo (entity based client-side routing)
- [web-todomvc](./web-todomvc/README.md) — TodoMVC implemented with `@inglorious/web`
- [react-todomvc](./react-todomvc/README.md) — React TodoMVC demo
- [react-todomvc-cs](./react-todomvc-cs/README.md) — React TodoMVC + json-server demo
- [react-todomvc-rt](./react-todomvc-rt/README.md) — React TodoMVC + runtime/mock-api demo
- [react-todomvc-ts](./react-todomvc-ts/README.md) — React TodoMVC in TypeScript

Quick start (from repo root):

```bash
cd examples/apps/<demo-name>
pnpm install
pnpm dev
```

Open the provided README inside each demo for more details.
