# Inglorious Forge

A collection of small, focused JavaScript tools — forged one piece at a time.

Inglorious Forge is a monorepo that groups together several related projects: a lightweight state manager, a minimal web framework, utilities, a realtime server, scaffolding tools, and other experimental parts that grew naturally out of building games and applications.

These tools share the same philosophy:

- Prefer **plain JavaScript** over custom languages and DSLs
- Keep modules **simple**, **transparent**, and **modular**
- Avoid build-time magic when possible
- Let developers understand what happens under the hood
- Keep the surface area small and predictable
- Favor composition over hierarchy

There is no ambition to replace mainstream frameworks. These libraries exist because they were useful in real projects and might be useful to others who appreciate a simple, direct style of building.

---

## Packages

### `@inglorious/utils`

Shared utility functions used across packages.

### `@inglorious/store`

An entity-based state manager with event-driven updates and predictable data flow.
Used by both the web framework and the game engine.

### `@inglorious/web`

A small view layer built around `lit-html` and the entity store.
No components, no lifecycles — just functions that return templates.

Includes built-in utilities like:

- router
- virtualized lists
- forms
- tables
- and other small helpers

### `@inglorious/create-app`

A scaffolding tool that creates project templates:

- minimal (no bundler)
- JS (Vite)
- TS (Vite + TypeScript)

### `@inglorious/engine`

A modular game engine built on top of the same entity model.

### `@inglorious/babel-plugin-inglorious-script`

A small scripting language originally designed for in-game logic.

### `@inglorious/server`

A simple server for realtime state synchronization.

More packages may appear over time as needs arise.

---

## Why These Tools Exist

This project started with building a game engine.

Along the way, it became clear that many of the patterns — especially the entity/event model — also worked well for standard web apps.

Instead of starting from a large framework and restricting it to an engine, the approach here was the opposite:

**Start from a small, generic core and expand outward only when necessary.**

Every package in this repository exists because it solved a real problem in one of the author’s projects. None of it was designed as a product first.

If you enjoy simple tools that do one thing at a time and don’t require buying into a large ecosystem, this may fit your style.

If you prefer large, batteries-included frameworks or strongly opinionated architectures, this probably won’t.

Both approaches are valid.

---

## Philosophy

Some guiding principles:

- **Clarity over cleverness**
- **Plain JavaScript first**
- **Minimal abstractions**
- **Small, focused modules**
- **Let users opt into complexity only when needed**

There is no attempt to chase trends or build hype.

This is just an experiment in how far simplicity and consistency can go.

---

## Status

These libraries are used in personal and experimental projects, but they are still evolving.

Documentation is improving gradually.

Breaking changes may happen between minor versions until things stabilize.

If you try them and find sharp edges, please open an issue.

---

## License

**MIT License - Free and open source**

Created by [Matteo Antony Mistretta](https://github.com/IngloriousCoderz)

You're free to use, modify, and distribute this software. See [LICENSE](./LICENSE) for details.

---

## Contributing

We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated. Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on how to get started.
