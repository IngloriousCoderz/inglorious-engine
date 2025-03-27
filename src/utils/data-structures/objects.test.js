import { expect, test } from "vitest"

import { extend, merge } from "./objects.js"

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
    primitiveArrayMerged: [5, 4],
    primitiveArrayAdded: [6, 7],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ b: 2, c: 3, d: 4 }],
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
    primitiveArrayMerged: [5, 4],
    primitiveArrayAdded: [6, 7],
    primitiveObjectKept: { a: 1 },
    primitiveObjectMerged: { b: 2, c: 4 },
    primitiveObjectAdded: { d: 4 },
    nestedArrayKept: [{ a: 1 }],
    nestedArrayMerged: [{ b: 2, c: 3, d: 4 }],
    nestedArrayAdded: [{ e: 5 }],
    nestedObjectKept: { a: { b: 2 } },
    nestedObjectMerged: { c: { d: 4, e: 5 } },
    nestedObjectAdded: { f: { g: 7 } },
  }

  const result = merge(obj1, obj2)
  expect(result).toStrictEqual(expectedResult)
  expect(result).toBe(obj1)
})
