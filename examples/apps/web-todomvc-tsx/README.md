# web-todomvc-tsx

A client-only TodoMVC demo implemented using `@inglorious/web` and **TSX**.

This example mirrors the standard `web-todomvc` demo but uses `.tsx` files and the `@inglorious/vite-plugin-jsx` compiler to write views in a React-like syntax that compiles down to zero-runtime `lit-html` templates.

Quick start:

```bash
cd examples/apps/web-todomvc-tsx
pnpm install
pnpm dev
```

Files of interest:

- `src/form/form.tsx` — form component (type definition + render)
- `src/list/list.tsx` — list component (type definition + render)
- `src/footer/footer.tsx` — footer component (type definition + render)
- `src/store/` — store configuration, entities, and selectors
