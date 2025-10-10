import { expect, test } from "vitest"

import { compose, pipe } from "./functions.js"

test("it should compose unary functions", () => {
  const shout = (x) => x.toUpperCase()
  const punctuate = (mark) => (x) => `${x}${mark}`
  const html = (tag) => (x) => `<${tag}>${x}</${tag}>`

  const fn = compose(html("p"), punctuate("!"), shout)
  expect(fn("Hello world")).toBe("<p>HELLO WORLD!</p>")
})

test("it should compose functions with multiple initial arguments", () => {
  const add = (a, b) => a + b
  const square = (x) => x * x
  const half = (x) => x / 2

  const fn = compose(half, square, add) // half(square(add(2, 3)))
  expect(fn(2, 3)).toBe(12.5)
})

test("it should return an identity-like function if compose is called with no arguments", () => {
  const fn = compose()
  expect(fn(42)).toBe(42)
  expect(fn({ a: 1 })).toStrictEqual({ a: 1 })
})

test("it should pipe unary functions", () => {
  const shout = (x) => x.toUpperCase()
  const punctuate = (mark) => (x) => `${x}${mark}`
  const html = (tag) => (x) => `<${tag}>${x}</${tag}>`

  const fn = pipe(shout, punctuate("!"), html("p"))
  expect(fn("Hello world")).toBe("<p>HELLO WORLD!</p>")
})

test("it should pipe functions with multiple initial arguments", () => {
  const add = (a, b) => a + b
  const square = (x) => x * x
  const half = (x) => x / 2

  const fn = pipe(add, square, half) // half(square(add(2, 3)))
  expect(fn(2, 3)).toBe(12.5)
})

test("it should return an identity-like function if pipe is called with no arguments", () => {
  const fn = pipe()
  expect(fn(42)).toBe(42)
  expect(fn({ a: 1 })).toStrictEqual({ a: 1 })
})
