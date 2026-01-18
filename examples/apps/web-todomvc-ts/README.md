# web-todomvc-ts

A client-only TodoMVC demo implemented using `@inglorious/web`. This is the TypeScript version of the `web-todomvc` example. Great for studying basic patterns: store wiring, item rendering, selection, and filtering. A good starting point before exploring the client-server version.

## Component Organization

This demo uses a simpler, single-file approach where each component (form, list, footer) is defined in a single file containing the component implementation and render function.

Quick start:

```bash
cd examples/apps/web-todomvc-ts
pnpm install
pnpm dev
```

Files of interest:

- `src/main.ts` — application entry point and mounting
- `src/types.ts` — TypeScript interfaces for state, entities, and components
- `src/form/form.ts` — form component logic and render
- `src/list/list.ts` — list component logic and render
- `src/footer/footer.ts` — footer component logic and render
- `src/store/` — store configuration, selectors, and middlewares
