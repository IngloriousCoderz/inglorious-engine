# Babel Plugin: IngloriousScript

[![npm version](https://img.shields.io/npm/v/@inglorious/babel-plugin-inglorious-script.svg)](https://www.npmjs.com/package/@inglorious/babel-plugin-inglorious-script)

`@inglorious/babel-plugin-inglorious-script` is a Babel plugin that transforms your JavaScript code into **IngloriousScript**, a superset of JavaScript that provides intuitive, operator-overloaded vector math.

This allows you to write vector operations using familiar arithmetic operators (`+`, `-`, `*`, `/`, etc.), making your game logic cleaner, more readable, and less error-prone. The plugin compiles these operations into highly optimized function calls at build time.

## Why IngloriousScript?

Working with vectors in game development often involves verbose and repetitive function calls:

```javascript
// Before: Standard JavaScript
import { add, scale, mod } from "@inglorious/utils/math/vectors.js"

const newPosition = mod(add(position, scale(velocity, dt)), worldSize)
```

With IngloriousScript, you can write the same logic as a natural mathematical expression:

```javascript
// After: IngloriousScript
const newPosition = (position + velocity * dt) % worldSize
```

The plugin handles the transformation, giving you the best of both worlds: elegant syntax in your source code and efficient execution in the browser.

## Features

- **Intuitive Syntax**: Use standard math operators for vector arithmetic.
- **Compile-Time Transformation**: No runtime overhead. Your code is converted to efficient function calls during your build process.
- **Static Type-Checking**: The plugin traces variable assignments to identify vectors, catching errors like vector-on-vector multiplication at compile time.
- **Operator Support**: A wide range of binary, unary, and compound assignment operators are supported.

## Installation

First, install the plugin using your package manager:

```bash
npm install -D @inglorious/babel-plugin-inglorious-script
# or
yarn add -D @inglorious/babel-plugin-inglorious-script
# or
pnpm add -D @inglorious/babel-plugin-inglorious-script
```

Then, add it to your Babel configuration file (e.g., `.babelrc.json`):

```json
{
  "plugins": ["inglorious-script"]
}
```

## Usage

The plugin automatically detects vectors created with the `v` function from `@inglorious/utils/v.js` and transforms the operations they are involved in.

### Supported Operations

#### Vector-Vector Operations

Addition and subtraction between two vectors work as you'd expect.

```javascript
import { v } from "@inglorious/utils/v.js"

const v1 = v(10, 20)
const v2 = v(1, 2)

const sum = v1 + v2 // Becomes sum(v1, v2)
const difference = v1 - v2 // Becomes subtract(v1, v2)
```

#### Vector-Scalar Operations

You can use `*`, `/`, `%`, and `**` to operate on a vector with a scalar. The order of operands does not matter.

```javascript
const v1 = v(10, 20)
const s = 2

const scaled = v1 * s // Becomes scale(v1, s)
const divided = v1 / s // Becomes divide(v1, s)
const modulo = v1 % s // Becomes mod(v1, s)
const power = v1 ** s // Becomes power(v1, s)

// Scalar-first works too!
const scaled2 = s * v1 // Becomes scale(s, v1)
```

#### Unary Minus

Negate a vector using the unary minus operator.

```javascript
const v1 = v(5, -10)
const negated = -v1 // Becomes scale(v1, -1)
```

#### Compound Assignments

Compound assignment operators are fully supported for in-place modifications.

```javascript
let position = v(0, 0)
const velocity = v(1, 2)

position += velocity // position = sum(position, velocity)
position *= 2 // position = scale(position, 2)
```

Supported assignment operators: `+=`, `-=`, `*=`, `/=`, `%=`, `**=`.

### Compile-Time Safety

The plugin helps prevent common mistakes. For example, multiplying two vectors is mathematically ambiguous. IngloriousScript will throw a compile-time error and guide you toward the correct function.

```javascript
const v1 = v(1, 2)
const v2 = v(3, 4)

// This will throw an error during compilation:
const result = v1 * v2
// error: Cannot multiply two vectors. Did you mean dot product (dot(v1, v2)) or cross product (cross(v1, v2))?
```

### Runtime Safety for Mixed Operations

In cases where an operand's type cannot be determined at compile time (e.g., it comes from a function call or a complex expression), the plugin transforms the code into a helper function that performs a runtime check. This ensures that your code is both flexible and safe.

```javascript
import { getForce } from "./physics.js"

let velocity = v(0, 0)
const force = getForce() // 'force' could be a vector or a scalar

// The plugin can't know the type of 'force', so it wraps the operation.
velocity += force

// Transformed to:
// velocity = __vectorSum(velocity, force);
// The __vectorSum helper will handle both vector-vector and vector-scalar addition at runtime.
```

## How It Works

`@inglorious/babel-plugin-inglorious-script` traverses the Abstract Syntax Tree (AST) of your code. It performs static analysis to track variables that hold vector values. When it finds an arithmetic operator being used with at least one vector operand, it replaces that expression with a call to a corresponding helper function from the `@inglorious/utils` package.

All helper functions are automatically injected into your code, so you don't need to import them manually.
