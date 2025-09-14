import { expect, test } from "vitest"

import { isArray } from "./array.js"
import { extend, extendWith, merge, mergeWith } from "./objects.js"

test("it should extend an object with another, producing a new object as a result", () => {
  const obj1 = {
    primitiveKept: 1,
    primitiveMerged: 2,
    primitiveArrayKept: [1, 2],
    primitiveArrayMerged: [3, 4],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 3 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ b: 2, c: 3 }],
    nestedObjectKept: { a: { b: 2 } },
    nestedObjectMerged: { c: { d: 4 } },
  }
  const obj2 = {
    primitiveMerged: 3,
    primitiveAdded: 4,
    primitiveArrayMerged: [5],
    primitiveArrayAdded: [6, 7],
    primitiveObjectMerged: { c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayMerged: [{ d: 4 }],
    nestedArrayAdded: [{ e: 5 }],
    nestedObjectMerged: { c: { e: 5 } },
    nestedObjectAdded: { f: { g: 7 } },
  }
  const expectedResult = {
    primitiveKept: 1,
    primitiveMerged: 3,
    primitiveAdded: 4,
    primitiveArrayKept: [1, 2],
    primitiveArrayMerged: [5],
    primitiveArrayAdded: [6, 7],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ d: 4 }],
    nestedArrayAdded: [{ e: 5 }],
    nestedObjectKept: { a: { b: 2 } },
    nestedObjectMerged: { c: { d: 4, e: 5 } },
    nestedObjectAdded: { f: { g: 7 } },
  }

  const result = extend(obj1, obj2)
  expect(result).toStrictEqual(expectedResult)
  expect(result).not.toBe(obj1)
})

test("it should deep merge an two objects, changing the first object in place", () => {
  const obj1 = {
    primitiveKept: 1,
    primitiveMerged: 2,
    primitiveArrayKept: [1, 2],
    primitiveArrayMerged: [3, 4],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 3 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ b: 2, c: 3 }],
    nestedObjectKept: { a: { b: 2 } },
    nestedObjectMerged: { c: { d: 4 } },
  }
  const obj2 = {
    primitiveMerged: 3,
    primitiveAdded: 4,
    primitiveArrayMerged: [5],
    primitiveArrayAdded: [6, 7],
    primitiveObjectMerged: { c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayMerged: [{ d: 4 }],
    nestedArrayAdded: [{ e: 5 }],
    nestedObjectMerged: { c: { e: 5 } },
    nestedObjectAdded: { f: { g: 7 } },
  }
  const expectedResult = {
    primitiveKept: 1,
    primitiveMerged: 3,
    primitiveAdded: 4,
    primitiveArrayKept: [1, 2],
    primitiveArrayMerged: [5],
    primitiveArrayAdded: [6, 7],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ d: 4 }],
    nestedArrayAdded: [{ e: 5 }],
    nestedObjectKept: { a: { b: 2 } },
    nestedObjectMerged: { c: { d: 4, e: 5 } },
    nestedObjectAdded: { f: { g: 7 } },
  }

  const result = merge(obj1, obj2)
  expect(result).toStrictEqual(expectedResult)
  expect(result).toBe(obj1)
})

test("it should extend an object with a custom merger, producing a new object", () => {
  const obj1 = {
    primitiveArrayMerged: [3, 4],
    nestedArrayMerged: [{ b: 2, c: 3 }],
    nestedObjectMerged: { c: { d: 4 } },
  }
  const obj2 = {
    primitiveArrayMerged: [5],
    nestedArrayMerged: [{ d: 4 }],
    nestedObjectMerged: { c: { e: 5 } },
  }

  const merger = (targetValue, sourceValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      return targetValue.concat(sourceValue)
    }
    return undefined // Use default logic for non-arrays
  }

  const expectedResult = {
    primitiveArrayMerged: [3, 4, 5], // Concatenated
    nestedArrayMerged: [{ b: 2, c: 3 }, { d: 4 }], // Concatenated
    nestedObjectMerged: { c: { d: 4, e: 5 } }, // Default deep merge
  }

  const result = extendWith(merger, obj1, obj2)
  expect(result).toStrictEqual(expectedResult)
  expect(result).not.toBe(obj1)
})

test("it should merge an object with a custom merger, changing the first object in place", () => {
  const obj1 = {
    primitiveArrayMerged: [3, 4],
    nestedArrayMerged: [{ b: 2, c: 3 }],
    nestedObjectMerged: { c: { d: 4 } },
  }
  const obj2 = {
    primitiveArrayMerged: [5],
    nestedArrayMerged: [{ d: 4 }],
    nestedObjectMerged: { c: { e: 5 } },
  }

  const merger = (targetValue, sourceValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      return targetValue.concat(sourceValue)
    }
    return undefined // Use default logic for non-arrays
  }

  const expectedResult = {
    primitiveArrayMerged: [3, 4, 5], // Concatenated
    nestedArrayMerged: [{ b: 2, c: 3 }, { d: 4 }], // Concatenated
    nestedObjectMerged: { c: { d: 4, e: 5 } }, // Default deep merge
  }

  const result = mergeWith(merger, obj1, obj2)
  expect(result).toStrictEqual(expectedResult)
  expect(result).toBe(obj1)
})

test("extendWith without a merger should behave like extend", () => {
  const obj1 = { a: 1, b: { c: 2 }, d: [3] }
  const obj2 = { a: 10, b: { d: 20 }, d: [30] }

  const expected = {
    a: 10,
    b: { c: 2, d: 20 },
    d: [30],
  }

  const result = extendWith(undefined, obj1, obj2)
  expect(result).toStrictEqual(expected)
  expect(result).not.toBe(obj1)

  const extendResult = extend(obj1, obj2)
  expect(result).toStrictEqual(extendResult)
})

test("mergeWith without a merger should behave like merge", () => {
  const obj1 = { a: 1, b: { c: 2 }, d: [3] }
  const obj2 = { a: 10, b: { d: 20 }, d: [30] }

  const expected = {
    a: 10,
    b: { c: 2, d: 20 },
    d: [30],
  }

  const result = mergeWith(undefined, obj1, obj2)
  expect(result).toStrictEqual(expected)
  expect(result).toBe(obj1)

  const mergeResult = merge({ a: 1, b: { c: 2 }, d: [3] }, obj2)
  expect(result).toStrictEqual(mergeResult)
})
