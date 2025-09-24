import { transformSync } from "@babel/core"
import { expect, test } from "vitest"

import ingloriousScript from "./index.js"

function transform(code) {
  return transformSync(code, {
    plugins: [ingloriousScript],
    sourceType: "module",
  }).code
}

// Existing tests
test("it should transform vector + vector addition", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const result = v1 + v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector * scalar multiplication", () => {
  const code = `const v1 = v(1, 2);
const s = 2;
const result = v1 * s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform scalar * vector multiplication", () => {
  const code = `const v1 = v(1, 2);
const s = 2;
const result = s * v1;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle direct v() calls", () => {
  const code = `const result = v(1, 2) + v(3, 4);`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle chained additions", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const v3 = v(5, 6);
const result = v1 + v2 + v3;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle mixed addition and scaling", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const s = 2;
const result = v1 + v2 * s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should not transform scalar + scalar addition", () => {
  const code = "const result = 1 + 2;"

  expect(transform(code)).toBe(code)
})

test("it should throw an error for vector * vector multiplication", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const result = v1 * v2;`

  expect(() => transform(code)).toThrow(
    "Cannot multiply two vectors. Did you mean dot product (dot(v1, v2)) or cross product (cross(v1, v2))?",
  )
})

test("it should trace variable declarations", () => {
  const code = `const pos = v(1, 2);
const vel = v(3, 4);
const newPos = pos + vel;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle imported vectors", () => {
  const code = `import { initialPosition } from './vectors.js';
const result = initialPosition + v(1, 2);`

  expect(transform(code)).toMatchSnapshot()
})

// UPDATED: These now transform safely with runtime checks
test("it should transform vector + scalar (runtime check)", () => {
  const code = `const result = v(1, 2) + 5;`
  expect(transform(code)).toMatchSnapshot()
})

test("it should transform scalar - vector (runtime check)", () => {
  const code = `const result = 5 - v(1, 2);`
  expect(transform(code)).toMatchSnapshot()
})

// New tests for additional operations

test("it should transform vector - vector subtraction", () => {
  const code = `const v1 = v(5, 6);
const v2 = v(1, 2);
const result = v1 - v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector / scalar division", () => {
  const code = `const v1 = v(10, 20);
const s = 2;
const result = v1 / s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector % scalar modulus", () => {
  const code = `const v1 = v(15, 25);
const s = 10;
const result = v1 % s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform unary minus on vector", () => {
  const code = `const v1 = v(1, 2);
const result = -v1;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should not transform unary plus on vector", () => {
  const code = `const v1 = v(1, 2);
const result = +v1;`

  expect(transform(code)).toBe(code)
})

// Compound assignment tests

test("it should transform vector += vector", () => {
  const code = `let v1 = v(1, 2);
const v2 = v(3, 4);
v1 += v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector -= vector", () => {
  const code = `let v1 = v(5, 6);
const v2 = v(1, 2);
v1 -= v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector *= scalar", () => {
  const code = `let v1 = v(1, 2);
const s = 2;
v1 *= s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector /= scalar", () => {
  const code = `let v1 = v(10, 20);
const s = 2;
v1 /= s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector %= scalar", () => {
  const code = `let v1 = v(15, 25);
const s = 10;
v1 %= s;`

  expect(transform(code)).toMatchSnapshot()
})

// UPDATED: These now transform safely with runtime checks
test("it should transform vector += scalar (runtime check)", () => {
  const code = `let v1 = v(1, 2);
v1 += 5;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector -= scalar (runtime check)", () => {
  const code = `let v1 = v(1, 2);
v1 -= 5;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector *= vector (runtime check)", () => {
  const code = `let v1 = v(1, 2);
const v2 = v(3, 4);
v1 *= v2;`

  expect(transform(code)).toMatchSnapshot()
})

// Division and modulus operations (now transform safely)

test("it should transform scalar / vector (runtime check)", () => {
  const code = `const v1 = v(1, 2);
const result = 5 / v1;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform scalar % vector (runtime check)", () => {
  const code = `const v1 = v(1, 2);
const result = 5 % v1;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector ** scalar", () => {
  const code = `const v1 = v(1, 2);
const result = v1 ** 2;`

  expect(() => transform(code)).toMatchSnapshot()
})

test("it should throw an error for vector ** vector", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const result = v1 ** v2;`

  expect(() => transform(code)).toMatchSnapshot()
})

test("it should transform scalar ** vector (runtime check)", () => {
  const code = `const v1 = v(1, 2);
const result = 2 ** v1;`

  expect(() => transform(code)).toMatchSnapshot()
})

// Complex chaining tests

test("it should handle chaining with division", () => {
  const code = `const v1 = v(10, 20);
const v2 = v(1, 2);
const result = v1 / 2 + v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle chaining with modulus", () => {
  const code = `const v1 = v(15, 25);
const v2 = v(1, 2);
const result = v1 % 10 + v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle chaining with unary minus", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const result = -v1 + v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle complex mixed operations", () => {
  const code = `const position = v(10, 20);
const velocity = v(1, 2);
const dt = 0.16;
const worldSize = 100;
const newPosition = (position + velocity * dt) % worldSize;`

  expect(transform(code)).toMatchSnapshot()
})

// Edge cases

test("it should handle nested expressions", () => {
  const code = `const v1 = v(1, 2);
const v2 = v(3, 4);
const v3 = v(5, 6);
const result = v1 + (v2 - v3) * 2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle assignment to object properties", () => {
  const code = `const obj = { pos: v(0, 0) };
const velocity = v(1, 2);
obj.pos += velocity;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle array element assignment", () => {
  const code = `const positions = [v(0, 0), v(1, 1)];
const velocity = v(1, 2);
positions[0] += velocity;`

  expect(transform(code)).toMatchSnapshot()
})

// Tests for ensuring regular number operations are NOT transformed

test("it should not transform number + number addition", () => {
  const code = "const result = 5 + 3;"
  expect(transform(code)).toBe(code)
})

test("it should not transform number - number subtraction", () => {
  const code = "const result = 10 - 4;"
  expect(transform(code)).toBe(code)
})

test("it should not transform number * number multiplication", () => {
  const code = "const result = 6 * 7;"
  expect(transform(code)).toBe(code)
})

test("it should not transform number / number division", () => {
  const code = "const result = 15 / 3;"
  expect(transform(code)).toBe(code)
})

test("it should not transform number % number modulus", () => {
  const code = "const result = 17 % 5;"
  expect(transform(code)).toBe(code)
})

test("it should not transform number compound assignments", () => {
  const code = `let x = 10;
x += 5;
x -= 2;
x *= 3;
x /= 2;
x %= 7;`
  expect(transform(code)).toBe(code)
})

test("it should not transform unary minus on numbers", () => {
  const code = `const x = 5;
const result = -x;`
  expect(transform(code)).toBe(code)
})

test("it should transform member expression operations (runtime check)", () => {
  const code = `const obj = {
  count: 5,
  speed: 10
};
obj.count += 3;
obj.speed *= 2;
const result = obj.count + obj.speed;`
  expect(transform(code)).toMatchSnapshot()
})

test("it should transform array element operations (runtime check)", () => {
  const code = `const numbers = [1, 2, 3];
numbers[0] += 5;
numbers[1] *= 2;
const sum = numbers[0] + numbers[1];`
  expect(transform(code)).toMatchSnapshot()
})

// NEW: Additional runtime safety tests

test("it should handle mixed vector/scalar operations in complex expressions", () => {
  const code = `const a = v(1, 2);
const b = 3;
const c = v(4, 5);
const result = a + b * c - 2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle vector operations with potentially undefined values", () => {
  const code = `import { maybeVector, maybeScalar } from './utils.js';
const result = maybeVector + maybeScalar;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle function call results in vector operations", () => {
  const code = `function getVec() { return v(1, 2); }
function getScalar() { return 5; }
const result = getVec() * getScalar() + v(3, 4);`

  expect(transform(code)).toMatchSnapshot()
})
