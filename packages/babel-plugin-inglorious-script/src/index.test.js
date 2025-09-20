import { transformSync } from "@babel/core"
import { expect, test } from "vitest"
import ingloriousScript from "./index.js"

function transform(code) {
  return transformSync(code, {
    plugins: [ingloriousScript],
    sourceType: "module",
  }).code
}

test("it should transform vector + vector addition", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const v2 = v(3, 4);
const result = v1 + v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform vector * scalar multiplication", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const s = 2;
const result = v1 * s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should transform scalar * vector multiplication", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const s = 2;
const result = s * v1;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle direct v() calls", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const result = v(1, 2) + v(3, 4);`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle chained additions", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const v2 = v(3, 4);
const v3 = v(5, 6);
const result = v1 + v2 + v3;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle mixed addition and scaling", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const v2 = v(3, 4);
const s = 2;
const result = v1 + v2 * s;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should not transform scalar + scalar addition", () => {
  const code = "const result = 1 + 2;"

  expect(transform(code)).toBe(code)
})

test("it should not transform vector * vector multiplication", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const v1 = v(1, 2);
const v2 = v(3, 4);
const result = v1 * v2;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should trace variable declarations", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
const pos = v(1, 2);
const vel = v(3, 4);
const newPos = pos + vel;`

  expect(transform(code)).toMatchSnapshot()
})

test("it should handle imported vectors", () => {
  const code = `import { v } from '@inglorious/utils/v.js';
import { initialPosition } from './vectors.js';
const result = initialPosition + v(1, 2);`

  expect(transform(code)).toMatchSnapshot()
})
