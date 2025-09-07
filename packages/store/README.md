# Inglorious Store

[![NPM version](https://img.shields.io/npm/v/@inglorious/store.svg)](https://www.npmjs.com/package/@inglorious/store)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The core, environment-agnostic state management library for the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine).

This package provides a powerful and predictable state container based on an **Entity-Component-System (ECS)** architecture, inspired by **[Redux](https://redux.js.org/)** but tailored for game development. It can be used in any JavaScript environment, including Node.js servers and browsers.

---

## Installation

```bash
npm install @inglorious/store
```

---

## Core Concepts

The state management is built on a few simple principles:

1.  **Entities and Properties**: The state is composed of **entities**, which are unique objects. Each entity has a **type** and a set of properties (e.g., `position: [0, 0, 0]`, `health: 100`). Unlike a traditional ECS, properties are not grouped into explicit components.

2.  **Types and Behaviors**: The logic for how entities and the overall state change is defined in **types** and **systems**.
    - **Types** are arrays of **behaviors**. A behavior is an object that contains event handlers (e.g., `update(entity, dt) { ... }`). Behaviors are composable, allowing you to define a type by combining multiple sets of properties and event handlers.
    - **Systems** are objects that contain event handlers to operate on the global state or manage interactions between entities.

3.  **Events and State Updates**: The only way to change the state is by issuing an **event**. An event is a plain object describing what happened (e.g., `{ type: 'move', payload: { id: 'player1', dx: 1 } }`).
    - The store processes events by first applying behaviors defined on an entity's type, and then running the logic in the systems.
    - An `update` event with a `dt` (delta time) payload is automatically dispatched on every `store.update()` call, making it suitable for a game loop.

4.  **Immutability**: The state is immutable. Updates are handled internally by **[Immer](https://immerjs.github.io/immer/)**, so you can "mutate" the state directly within a type's or system's behavior function, and a new, immutable state will be produced.

---

## API

### `createStore(options)`

Creates a new store instance.

**Parameters:**

- `options` (object):
  - `types` (object): A map of entity types. Keys are type names (e.g., `'player'`), and values are arrays of behaviors.
  - `entities` (object): A map of initial entities. Keys are entity IDs, and values are objects containing the entity's properties.
  - `systems` (array, optional): An array of system objects, which define behaviors for the whole state.

**Returns:**

- A `store` object with the following methods:
  - `subscribe(listener)`: Subscribes a `listener` to state changes. The listener is called after `store.update()` is complete. Returns an `unsubscribe` function.
  - `update(dt, api)`: Processes the event queue and updates the state. This is typically called once per frame. `dt` is the time elapsed since the last frame, and `api` is the engine's public API.
  - `notify(type, payload)`: Adds a new event to the queue to be processed on the next `update` call.
  - `dispatch(event)`: A Redux-compatible alias for `notify`.
  - `getState()`: Returns the current, immutable state.
  - `setState(newState)`: Replaces the entire state with a new one. Use with caution.
  - `getTypes()`: Returns the augmented types configuration. Augmenting here means that the array of behaviors is merged into one single behavior.
  - `getOriginalTypes()`: Returns the original, un-augmented behavior arrays.
  - `reset()`: Resets the state to its initial configuration.

---

### `createSelector(inputSelectors, resultFunc)`

Creates a memoized selector to efficiently compute derived data from the state. It only recomputes the result if the inputs to the `resultFunc` have changed.

**Parameters:**

- `inputSelectors` (array of functions): An array of selector functions that take the state and return a slice of it.
- `resultFunc` (function): A function that takes the results of the `inputSelectors` and returns the final computed value.

**Returns:**

- A memoized selector function that takes the `state` as its only argument and returns the selected data.

---

### `createApi(store)`

Creates a convenient API object that encapsulates the store's methods and provides common utility functions for accessing state.

**Parameters:**

- `store` (object): The store instance created with `createStore`.

**Returns:**

- An `api` object with methods for interacting with the store and state, including:
  - `createSelector(inputSelectors, resultFunc)`: A helper function that automatically binds the store's state to a new selector.
  - `getTypes()`, `getEntities()`, `getEntity(id)`: Utility functions for accessing state.
  - `notify(type, payload)`, `dispatch(action)`: Aliases to the store's event dispatching methods.

---

## Basic Usage

Here is a simple example of a player entity that moves based on events.

```javascript
import { createStore, createApi } from "@inglorious/store"
import { add, scale } from "@inglorious/utils/math/linear-algebra/vectors.js"

// 1. Define the behaviors
const transform = {
  // The second parameter of an event handler is the payload
  move: (entity, payload) => {
    entity.position[0] += payload.dx || 0
    entity.position[1] += payload.dy || 0
    entity.position[2] += payload.dz || 0
  },
}

const kinematic = {
  update: (entity, dt) => {
    // You can use utility functions for easy vector operations
    entity.position = add(entity.position, scale(entity.velocity, dt))
  },
}

// 2. Define the entity types by composing behaviors
const types = {
  player: [
    // Composed behaviors
    transform,
    kinematic,
  ],
}

// 3. Define the initial entities
const entities = {
  player1: {
    type: "player",
    position: [0, 0, 0],
    velocity: [0.0625, 0, 0],
  },
}

// 4. Create the store and a unified API
const store = createStore({ types, entities })
const api = createApi(store)

// 5. Create selectors to get data from the state
const selectPlayerPosition = api.createSelector(
  [(state) => state.entities.player1],
  (player) => player.position,
)

// 6. Subscribe to changes
store.subscribe(() => {
  console.log("State updated!", selectPlayerPosition())
})

// 7. Notify the store of an event
console.log("Initial player position:", selectPlayerPosition()) // => [0, 0, 0]

// Dispatch a custom `move` event with a payload
api.notify("move", { id: "player1", dx: 5, dz: 5 })

// Events are queued but not yet processed
console.log("Position after notify:", selectPlayerPosition()) // => [0, 0, 0]

// 8. Run the update loop to process the queue and trigger `update` behaviors
store.update(16) // Pass delta time
// Console output from subscriber: "State updated! [6, 0, 5]"

console.log("Final position:", selectPlayerPosition()) // => [6, 0, 5]
```
