# web-todomvc

A client-only TodoMVC demo implemented using `@inglorious/web`. Great for studying basic patterns: store wiring, item rendering, selection, and filtering. A good starting point before exploring the client-server version.

## Component Organization

This demo uses a simpler, single-file approach where each component (form, list, footer) is defined in a single file containing both the type definition and render function.

Quick start:

```bash
cd examples/apps/web-todomvc
pnpm install
pnpm dev
```

Files of interest:

- `src/form/form.js` — form component (type definition + render)
- `src/list/list.js` — list component (type definition + render)
- `src/footer/footer.js` — footer component (type definition + render)
- `src/store/` — store configuration, entities, and selectors
