# Contributing to Inglorious Engine

First off, thank you for considering contributing to Inglorious Engine! It's people like you that make open source great. We welcome contributions from the community! Whether you're fixing a bug, adding a feature, or improving the documentation, your help is appreciated.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please check the issues on GitHub to see if it has already been reported. If not, please open a new issue. Be sure to include a clear title, a detailed description of the problem, and steps to reproduce it if possible.

### Suggesting Enhancements

If you have an idea for a new feature or an improvement to an existing one, feel free to open an issue to discuss it. This allows us to coordinate our efforts and prevent duplication of work.

### Pull Requests

We love pull requests! If you're ready to contribute code, here's how to do it:

1.  Fork the repository and create your branch from `main`.
2.  Make your changes and add tests for any new functionality.
3.  Ensure the test suite passes (`pnpm test`).
4.  Make sure your code lints. The project uses ESLint for linting and Prettier for formatting.
5.  Issue that pull request!

## Development Setup

1.  Fork and clone the repository.
2.  Install dependencies using pnpm:
    ```bash
    pnpm install
    ```
3.  Run the Storybook documentation locally:
    ```bash
    pnpm storybook
    ```
4.  Run the unit tests:
    ```bash
    pnpm test
    ```

## Code Style

A note on code style, particularly regarding "magic numbers" for vector components. Instead of creating a constant for each vector index:

```js
const X = 0
const Y = 1
const Z = 2

const x = entity.position[X]
const y = entity.position[Y]
const z = entity.position[Z]
```

We find it cleaner to use array destructuring, like so:

```js
const [x, y, z] = entity.position
```

There are a few exceptions: in the `/docs` folder we prefer the first version because not everyone is used to destructuring and we wanted to make the examples as readable as possible for people coming from, say, Godot. In that case we would put the `X`, `Y`, and `Z` constants on top of the file, right below the imports, so that they can be used throughout the whole game file.
