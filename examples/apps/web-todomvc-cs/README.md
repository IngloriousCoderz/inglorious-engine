# web-todomvc-cs

A small TodoMVC demo implemented using `@inglorious/web` with a client-server architecture. Great for studying basic patterns: store wiring, item rendering, selection, filtering, and client-server communication.

## Architecture

This demo showcases how easy it is to create a client-server app with `@inglorious/web`. The server is a simple JSON server that can be run via `pnpm api`, while the client uses the store to manage state and handle events.

## Component Organization

Each component is organized as a directory that separates concerns between two modules:

- **render module** — contains the presentation logic and render function
- **handlers module** — contains all event handlers and business logic

These two modules are then combined in their `index.js` file, creating a clean separation between UI and logic.

## Styling

This demo uses **CSS modules** for style scoping, ensuring component styles don't leak to other parts of the application. Each component has its own `.module.css` file that's scoped to that component.

Quick start:

```bash
cd examples/apps/web-todomvc-cs
pnpm install
pnpm dev
pnpm api  # in another terminal
```

Files of interest:

- `src/components/` — component directories (form, list, footer) with render and handlers modules
- `src/store/` — store configuration and entities
- `src/services/` — API client
