import { expect, test } from 'vitest'

import { random, randomBinomial } from '.'

test('it should create a random number in the range [0, 1)', () => {
  const randomNumber = random()

  expect(randomNumber).toBeGreaterThanOrEqual(0)
  expect(randomNumber).toBeLessThan(1)
})

test('it should create a random integer in the range [0, 6]', () => {
  const randomNumber = random(6)

  expect(randomNumber).toBeGreaterThanOrEqual(0)
  expect(randomNumber).toBeLessThanOrEqual(6)
})

test('it should create a random integer in the range [1, 6]', () => {
  const randomNumber = random(1, 6)

  expect(randomNumber).toBeGreaterThanOrEqual(1)
  expect(randomNumber).toBeLessThanOrEqual(6)
})

test('it should create a random even number in the range [2, 6]', () => {
  const randomNumber = random(2, 6, 2)

  expect(randomNumber).toBeGreaterThanOrEqual(1)
  expect(randomNumber).toBeLessThanOrEqual(6)
  expect(randomNumber % 2).toBe(0)
})

test('it should create a random number in the range (-1, 1)', () => {
  const randomNumber = randomBinomial()

  expect(randomNumber).toBeGreaterThan(-1)
  expect(randomNumber).toBeLessThan(1)
})
