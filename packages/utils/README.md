# Inglorious Utils

[![NPM version](https://img.shields.io/npm/v/@inglorious/utils.svg)](https://www.npmjs.com/package/@inglorious/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A set of general-purpose utility functions designed with functional programming principles in mind. This package is part of the [Inglorious Engine](https://github.com/IngloriousCoderz/inglorious-engine) monorepo.

## Overview

This package provides a collection of pure, composable helper functions to streamline development in any JavaScript or TypeScript project. It embraces a data-oriented and functional approach, operating on plain data structures like objects and arrays.

## Installation

```bash
npm install @inglorious/utils
```

## Usage

Here are a few examples of how you can use the utilities in this package.

### `pipe`

Compose functions together in a readable, left-to-right sequence.

```javascript
import { pipe } from "@inglorious/utils/functions/functions"

const add = (a) => (b) => a + b
const multiply = (a) => (b) => a * b

const calculate = pipe(
  add(5), // 10 + 5 = 15
  multiply(2), // 15 * 2 = 30
  add(10), // 30 + 10 = 40
)

const result = calculate(10) // 40
```

### Vector Math

Perform vector operations on plain objects.

```javascript
import { add } from "@inglorious/utils/math/vector.js"

const position = [10, 20]
const velocity = [2, -1]

const newPosition = add(position, velocity)
// => [12, 19]
```

## API

This package is designed to be used with subpath imports, which helps with tree-shaking.

- **`@inglorious/utils/algorithms`**: Utilities for AI algorithms, like decision trees and A\*.
- **`@inglorious/utils/functions`**: Utilities for function composition.
- **`@inglorious/utils/math`**: Utilities for math operations.
- **`@inglorious/utils/physics`**: Utilities for calculations on friction, acceleration, and gravity.

## Contributing

We welcome contributions! Please see the root `CONTRIBUTING.md` file for more details.

## License

This project is licensed under the MIT License.
