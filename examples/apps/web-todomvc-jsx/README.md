# web-todomvc-jsx

A client-only TodoMVC demo implemented using `@inglorious/web` and **JSX**.

This example mirrors the standard `web-todomvc` demo but uses `.jsx` files and the `@inglorious/vite-plugin-jsx` compiler to write views in a React-like syntax that compiles down to zero-runtime `lit-html` templates.

Quick start:

```bash
cd examples/apps/web-todomvc-jsx
pnpm install
pnpm dev
```

Files of interest:

- `src/form/form.jsx` — form component (type definition + render)
- `src/list/list.jsx` — list component (type definition + render)
- `src/footer/footer.jsx` — footer component (type definition + render)
- `src/store/` — store configuration, entities, and selectors
