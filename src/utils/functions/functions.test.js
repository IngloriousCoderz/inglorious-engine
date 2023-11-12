import { expect, test } from 'vitest'

import { compose, pipe } from './functions.js'

test('it should compose functions', () => {
  const shout = (x) => x.toUpperCase()
  const punctuate = (mark) => (x) => `${x}${mark}`
  const html = (tag) => (x) => `<${tag}>${x}</${tag}>`

  const fn = compose(html('p'), punctuate('!'), shout)

  expect(fn('Hello world')).toBe('<p>HELLO WORLD!</p>')
})

test('it should pipe functions', () => {
  const shout = (x) => x.toUpperCase()
  const punctuate = (mark) => (x) => `${x}${mark}`
  const html = (tag) => (x) => `<${tag}>${x}</${tag}>`

  const fn = pipe(shout, punctuate('!'), html('p'))

  expect(fn('Hello world')).toBe('<p>HELLO WORLD!</p>')
})
