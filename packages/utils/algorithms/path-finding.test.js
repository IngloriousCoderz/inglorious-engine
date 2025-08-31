import { expect, test } from "vitest"

import {
  createBoard,
  down,
  downRight,
  right,
} from "../data-structures/board.js"
import { findPath } from "./path-finding.js"

test("it should find the shortest path in a trivial example", () => {
  const graph = {
    nodes: {
      A: [0, 0],
      B: [2, 0],
    },
    arcs: [{ from: "A", to: "B", cost: 2 }],
  }
  const start = "A"
  const end = "B"
  const expectedResult = ["A", "B"]

  expect(findPath(graph, start, end)).toStrictEqual(expectedResult)
})

test("it should find the shortest path between two nodes with default heuristic", () => {
  const graph = {
    nodes: {
      A: [0, 0],
      B: [2, 0],
      C: [3, 2],
      D: [4, 4],
      E: [1, 1],
      F: [2, 3],
      G: [0, 4],
    },
    arcs: [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "C", to: "D" },
      { from: "A", to: "E" },
      { from: "E", to: "F" },
      { from: "F", to: "G" },
      { from: "G", to: "D" },
    ],
  }
  const start = "A"
  const end = "D"
  const expectedResult = ["A", "B", "C", "D"]

  expect(findPath(graph, start, end)).toStrictEqual(expectedResult)
})

test("it should find the shortest path between two nodes with node costs", () => {
  const graph = {
    nodes: [
      { id: "A", position: [0, 0], cost: 0 },
      { id: "B", position: [2, 0], cost: 7 },
      { id: "C", position: [3, 2], cost: 3 },
      { id: "D", position: [4, 4], cost: 2 },
      { id: "E", position: [1, 1], cost: 1.5 },
      { id: "F", position: [2, 3], cost: 2 },
      { id: "G", position: [0, 4], cost: 3 },
    ],
    arcs: [
      { from: "A", to: "B" },
      { from: "B", to: "C" },
      { from: "C", to: "D" },
      { from: "A", to: "E" },
      { from: "E", to: "F" },
      { from: "F", to: "G" },
      { from: "G", to: "D" },
    ],
  }
  const start = "A"
  const end = "D"
  const expectedResult = ["A", "E", "F", "G", "D"]

  expect(findPath(graph, start, end)).toStrictEqual(expectedResult)
})

test("it should find the shortest path between two nodes with arc costs", () => {
  const graph = {
    nodes: {
      A: [0, 0],
      B: [2, 0],
      C: [3, 2],
      D: [4, 4],
      E: [1, 1],
      F: [2, 3],
      G: [0, 4],
    },
    arcs: [
      { from: "A", to: "B", cost: 7 },
      { from: "B", to: "C", cost: 3 },
      { from: "C", to: "D", cost: 2 },
      { from: "A", to: "E", cost: 1.5 },
      { from: "E", to: "F", cost: 2 },
      { from: "F", to: "G", cost: 3 },
      { from: "G", to: "D", cost: 4 },
    ],
  }
  const start = "A"
  const end = "D"
  const expectedResult = ["A", "E", "F", "G", "D"]

  expect(findPath(graph, start, end)).toStrictEqual(expectedResult)
})

test("it should find the best path in a board graph", () => {
  const rows = 5
  const columns = 5
  const size = [rows, columns]
  const filler = (i, j) => ({ id: `${i}${j}`, position: [i, j] })
  const board = createBoard(size, filler)

  const graph = {
    nodes: board,
    arcs: [],
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const current = `${i}${j}`
      if (i + 1 < rows) {
        graph.arcs.push({
          from: current,
          to: down([i, j], size).join(""),
        })
      }
      if (j + 1 < columns) {
        graph.arcs.push({
          from: current,
          to: right([i, j], size).join(""),
        })
      }
      if (i + 1 < rows && j + 1 < columns) {
        graph.arcs.push({
          from: current,
          to: downRight([i, j], size).join(""),
        })
      }
    }
  }

  const start = "00"
  const end = "44"
  const expectedResult = ["00", "11", "22", "33", "44"]

  expect(findPath(graph, start, end)).toStrictEqual(expectedResult)
})
